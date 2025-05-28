import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { PromptInput } from "./components/PromptInput";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  return (
    <>
      <h1 className="text-4xl font-bold mb-2 gold-text-bold">Olympia</h1>

      <p className="text-sm text-center lg:text-left opacity-90">
        Enter a goal and <span className="gold-text-bold">Olympia</span> will
        provide you with feedback to make it as successful as possible. You can
        also ask <span className="gold-text-bold">Olympia</span> to edit your
        goals, set notes on goals, mark goals as complete, and more.
      </p>
      <PromptInput email={user.user?.email} />
    </>
  );
}
