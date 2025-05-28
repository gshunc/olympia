"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { getGoalById } from "@/app/goals/actions";

interface Goal {
  id: string;
  name: string;
  description: string;
  created_at: string;
  // Add other goal properties as needed
}

interface EditGoalPromptInputProps {
  email: string | undefined;
  goalId: string;
}

export default function EditGoalPromptInput({
  email,
  goalId,
}: EditGoalPromptInputProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [history, setHistory] = useState<{ role: string; content: string }[]>(
    []
  );
  const [streamingResponse, setStreamingResponse] = useState<string>("");
  const [atBottom, setAtBottom] = useState<boolean>(true);
  const [goal, setGoal] = useState<Goal | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrolledRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Fetch goal information using goalId prop
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const goalData = await getGoalById(goalId);
        setGoal(goalData?.[0]);
      } catch (error) {
        console.error("Error fetching goal:", error);
      }
    };

    if (goalId) {
      fetchGoal();
    }
  }, [goalId]);

  useEffect(() => {
    const el = scrolledRef.current;
    if (!el) return;

    const onScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 1;
      setAtBottom(atBottom);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (atBottom && streamingResponse.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [streamingResponse, history, atBottom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentPrompt = prompt.trim();
    if (!currentPrompt) return;
    if (!email) {
      router.push("/login");
      return;
    }

    const updatedHistory = [
      ...history,
      {
        role: "system",
        content: `The current goal is <name>${goal?.name}</name>. The description is as follows: <description>${goal?.description}</description>. The goal was created on <created_at>${goal?.created_at}</created_at>.`,
      },
      { role: "user", content: currentPrompt },
    ];
    setHistory(updatedHistory);
    setPrompt("");
    setStreamingResponse("");

    try {
      // Modified API call to include goal context
      const response = await fetch(
        "http://localhost:8000/api/v1/process-prompt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            body: updatedHistory,
          }),
        }
      );
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { value, done } = (await reader?.read()) || {};
        if (done) break;
        const chunk = decoder.decode(value);
        setStreamingResponse((prev) => prev + chunk);
        fullText += chunk;
      }
      setHistory((prev) => [...prev, { role: "assistant", content: fullText }]);
      setStreamingResponse("");
    } catch (error) {
      console.error("Error:", error);
      setStreamingResponse("");
    }
  };

  return (
    <div className="flex flex-col h-[70vh] max-h-[800px] min-h-[500px] bg-gray-100 border-2 border-gray-300 rounded-lg">
      {/* Scrollable chat area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 min-h-0"
        ref={scrolledRef}
      >
        {history.length > 0 && (
          <div className="flex flex-col gap-y-4">
            {history.map(
              (message, index) =>
                message.role !== "system" && (
                  <div
                    key={index}
                    className={`whitespace-pre-line ${
                      message.role === "user" ? "self-end" : "self-start"
                    } max-w-[70%] ${
                      message.role === "user" ? "bg-amber-100" : "bg-blue-100"
                    } p-4 rounded`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                )
            )}
            {streamingResponse && (
              <div
                className={`whitespace-pre-line self-start max-w-[70%] bg-blue-100 p-4 rounded`}
              >
                <ReactMarkdown>{streamingResponse}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>

      {/* Sticky input at bottom */}
      <div className="bg-white border-t rounded-b-lg border-gray-200 p-4 flex-shrink-0">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-row gap-2 items-center"
        >
          <input
            type="text"
            className={`flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={
              history.length > 0
                ? "Edit this goal..."
                : `Edit "${goal?.name || "this goal"}"...`
            }
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className={`px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={!prompt.trim()}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </form>
      </div>
    </div>
  );
}
