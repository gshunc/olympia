"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/process-prompt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export function PromptInput() {
  const [prompt, setPrompt] = useState("");

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-row prompt-box">
      <input
        type="text"
        placeholder="How can I help you with your goals?"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button type="submit" className="gold-button">
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </form>
  );
}
