import { createClient } from "@/utils/supabase/server";
import EditGoalPromptInput from "@/app/components/goals/edit/EditGoalPromptInput";
import EditGoalButtonSuite from "@/app/components/goals/edit/EditGoalButtonSuite";

export default async function GoalDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase.from("goals").select("*").eq("id", id);
  const { data: user } = await supabase.auth.getUser();
  const email = user?.user?.email;

  if (error) {
    console.error(error);
  }
  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <h2 className="text-2xl gold-text-bold">Goal not found</h2>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl font-bold mb-2 gold-text-bold">
          {data?.[0].name}
        </h1>
        <EditGoalButtonSuite />
      </div>

      <div className="flex flex-col gap-2 bg-gray-100 p-2 rounded-md border-2 border-gray-300">
        <div className="text-center text-lg gold-text-bold">
          Refine this goal in chat or edit it below...
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col gap-2 w-1/2 rounded-md rounded-r-none px-2">
            <p className="text-lg text-center lg:text-left bg-gray-200 p-2 rounded-md border-2 border-gray-300">
              Description: {data?.[0].description}
            </p>
            <p className="text-lg text-center lg:text-left bg-gray-200 p-2 rounded-md border-2 border-gray-300">
              Created on: {new Date(data?.[0].created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="w-1/2">
            <EditGoalPromptInput email={email} goalId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
