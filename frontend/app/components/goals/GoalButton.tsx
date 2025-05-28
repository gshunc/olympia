"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import GoalModal from "./GoalModal";

interface GoalButtonProps {
  onGoalAdded: () => void;
}

export default function GoalButton({ onGoalAdded }: GoalButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="text-gray-900 text-xl font-semibold gold-button h-1/2 self-center flex flex-row gap-2"
      >
        <h2 className="text-sm">Add Goal</h2>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <GoalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onGoalAdded={onGoalAdded}
      />
    </>
  );
}
