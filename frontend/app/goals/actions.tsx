"use server";
import { createClient } from "@/utils/supabase/server";

interface Goal {
  name: string;
  description: string;
  user_id?: string;
  created_at?: string;
  id?: string;
}

async function getGoals(chronological: boolean = false) {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", user.user?.id)
    .order("created_at", { ascending: chronological });

  if (error) {
    console.error(error);
  }

  return data;
}

async function addGoal(goal: Goal) {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase.from("goals").insert({
    name: goal.name,
    description: goal.description,
    user_id: user.user?.id,
  });

  if (error) {
    console.error(error);
  }

  return data;
}

async function deleteGoal(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("goals")
    .delete()
    .eq("id", Number(id));

  if (error) {
    console.error(error);
  }

  return data;
}

async function getGoalById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("goals").select("*").eq("id", id);
  if (error) {
    console.error(error);
  }
  return data;
}

export { getGoals, addGoal, deleteGoal, getGoalById };
export type { Goal };
