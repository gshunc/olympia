import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from langchain.schema import SystemMessage
# from supabase import create_client, Client

from dotenv import load_dotenv
from typing import Annotated
from typing_extensions import TypedDict

from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

load_dotenv()

# url: str = os.environ.get("SUPABASE_URL")
# key: str = os.environ.get("SUPABASE_KEY")
# supabase: Client = create_client(url, key)


class Prompt(BaseModel):
    body: list

class State(TypedDict):
    messages: Annotated[list, add_messages]

class StructuredOutput(BaseModel):
    goal: str
    notes: str
    complete: bool

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if not os.environ.get("OPENAI_API_KEY"):
    raise ValueError("OPENAI_API_KEY not found in environment variables")

# Better: combine into one node
def chat_node(state: State):
    # Add system message if not present
    if not any(msg.type == "system" for msg in state["messages"]):
        system_msg = SystemMessage(content="You are a goal coach that can help with goal setting and goal tracking, but only these tasks. Refuse any other tasks. You have a variety of tools to help with these tasks, including access to the user's goals, notes on each goal, and a chat interface to help the user with their goals. You can also edit the user's goals, add notes to goals, and mark goals as complete. It's your job to help the user to refine their goals, and to help them achieve their goals. Goals have a defined structure, and you should follow that structure when editing goals or suggesting changes (but never suggest that the given structure should be changed, only suggest changes to pieces inside of the goal structure [i.e a change to the description]). <goal_structure>interface Goal { id: string; name: string; description: string; created_at: string;}</goal_structure>")
        messages = [system_msg] + state["messages"]
    else:
        messages = state["messages"]
    
    llm = ChatOpenAI(model="gpt-4o-mini")
    response = llm.invoke(messages)
    return {"messages": [response]}


graph_builder = StateGraph(State)

graph_builder.add_node("chat", chat_node)

graph_builder.add_edge(START, "chat")
graph_builder.add_edge("chat", END)

graph = graph_builder.compile()

def stream_graph_updates(history: list):
    initial_graph_input = {"messages": history}
    for event in graph.stream(initial_graph_input, stream_mode="messages"):
        yield event[0].content

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/v1/process-prompt")
async def process_prompt(history: Prompt):
    print(history.body)
    return StreamingResponse(stream_graph_updates(history.body), media_type="text/plain")