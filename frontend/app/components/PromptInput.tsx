"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

export function PromptInput(props: { email: string | undefined }) {
  const email = props.email;
  const [prompt, setPrompt] = useState<string>("");
  const [history, setHistory] = useState<{ role: string; content: string }[]>(
    []
  );
  const [streamingResponse, setStreamingResponse] = useState<string>("");
  const [atBottom, setAtBottom] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrolledRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [streamingResponse]);

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
      { role: "user", content: currentPrompt },
    ];
    setHistory(updatedHistory);
    setPrompt("");
    setStreamingResponse("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/process-prompt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: updatedHistory }),
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
    <div className="flex flex-col" ref={scrolledRef}>
      {history.length > 0 && (
        <div className="flex flex-col gap-y-4 chat-box">
          {history.map((message, index) => (
            <div
              key={index}
              className={`whitespace-pre-line ${
                message.role === "user" ? "self-end" : "self-start"
              } max-w-[70%] ${
                message.role === "user" ? "bg-amber-100" : "bg-gray-100"
              } p-4 rounded`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ))}
          {streamingResponse && (
            <div
              className={`whitespace-pre-line self-start max-w-[70%] bg-gray-100 p-4 rounded`}
            >
              <ReactMarkdown>{streamingResponse}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
      <div className="h-36" ref={bottomRef}></div>

      <div
        className={`prompt-box ${!atBottom ? "sticky bottom-0" : "self-end"}`}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-row gap-2 items-center"
        >
          <input
            type="text"
            className={`p-3 active-input mt-4`}
            placeholder={
              history.length > 0
                ? ""
                : `How can I help you with your goals${
                    email ? `, ${email}` : ""
                  }?`
            }
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className={`gold-button h-min mt-4`}
            disabled={!prompt}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </form>
      </div>
    </div>
  );
}
