import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
# from supabase import create_client, Client

from dotenv import load_dotenv
from typing import Annotated
from typing_extensions import TypedDict

from langchain.chat_models import ChatOpenAI
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
    
graph_builder = StateGraph(State)

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

def system_prompt():
    return "You are a goal coach that can help with goal setting and goal tracking, but only these tasks. You have a variety of tools to help with these tasks, including access to the user's goals, notes on each goal, and a chat interface to help the user with their goals. You can also edit the user's goals, add notes to goals, and mark goals as complete. It's your job to help the user to refine their goals, and to help them achieve their goals."

def welcome(state: State):
    llm = ChatOpenAI(model="gpt-4o-mini")

    llm_response = llm.invoke(state["messages"])
    return {"messages": [
        {"role": "assistant", "content": llm_response}
    ]}

graph_builder.add_node("welcome", welcome)

graph_builder.add_node("system_prompt", system_prompt)

graph_builder.add_edge(START, "system_prompt")

graph_builder.add_edge("system_prompt", "welcome")

graph_builder.add_edge("welcome", END)

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