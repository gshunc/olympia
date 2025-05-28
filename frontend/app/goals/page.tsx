"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import React, { useState, useEffect } from "react";
import GoalCard from "@/app/components/goals/GoalCard";
import GoalButton from "@/app/components/goals/GoalButton";
import { getGoals, Goal } from "./actions";
import GoalModal from "@/app/components/goals/GoalModal";

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadGoals = async () => {
    const goalsData = await getGoals(true);
    setGoals(goalsData);
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const refetchGoals = () => {
    loadGoals();
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl font-bold mb-2 gold-text-bold">My Goals</h1>
        <GoalButton onGoalAdded={refetchGoals} />
      </div>

      <p className="text-sm text-center lg:text-left mb-10">
        Add, edit, monitor, and track your goals here.
      </p>

      <div className="flex flex-col gap-10 mx-10">
        {goals?.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onGoalDeleted={refetchGoals} />
        ))}
      </div>

      {goals === null && (
        <div className="flex flex-col gap-10 mx-10">
          <div className="animate-pulse bg-gray-200 h-20 w-full rounded-lg"></div>
        </div>
      )}

      {goals?.length === 0 && (
        <p className="text-lg text-center mb-10">
          No goals found.{" "}
          <button
            onClick={openModal}
            className="gold-text-bold-underline bg-transparent border-none cursor-pointer p-0"
          >
            Add a goal
          </button>{" "}
          to get started.
        </p>
      )}

      <GoalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onGoalAdded={refetchGoals}
      />
    </>
  );
}
