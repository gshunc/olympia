import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { PromptInput } from "./components/PromptInput";

export default function Home() {
  return (
    <div className="lg:ml-40 lg:mr-40 mr-5 ml-5 flex flex-col lg:block lg:ml-0 lg:mt-5 scroll-auto lg:mr-20 pb-5 pt-20">
      <h1 className="text-4xl font-bold mb-6 gold-text">Olympia</h1>

      <div className="mb-10">
        <p className="text-sm text-center lg:text-left mb-5">
          Enter a goal and <span className="gold-text">Olympia</span> will
          provide you with feedback to make it as successful as possible. You
          can also ask <span className="gold-text">Olympia</span> to edit your
          goals, set notes on goals, mark goals as complete, and more.
        </p>
        <PromptInput />
      </div>
    </div>
  );
}
