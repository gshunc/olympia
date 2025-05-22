import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { PromptInput } from "./components/PromptInput";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  return (
    <div className="lg:ml-40 lg:mr-40 mr-5 ml-5 flex flex-col lg:block lg:ml-0 lg:mt-5 scroll-auto lg:mr-20 pt-20">
      <h1 className="text-4xl font-bold mb-6 gold-text">Olympia</h1>

      <p className="text-sm text-center lg:text-left mb-5">
        Enter a goal and <span className="gold-text">Olympia</span> will provide
        you with feedback to make it as successful as possible. You can also ask{" "}
        <span className="gold-text">Olympia</span> to edit your goals, set notes
        on goals, mark goals as complete, and more.
      </p>
      <PromptInput email={user.user?.email} />
    </div>
  );
}
