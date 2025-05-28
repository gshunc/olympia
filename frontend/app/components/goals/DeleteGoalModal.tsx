"use client";

import { Goal, deleteGoal } from "@/app/goals/actions";
import Modal from "../Modal";
import Button from "../ui/Button";

export default function DeleteGoalModal({
  goal,
  onClose,
  isOpen,
  onGoalDeleted,
}: {
  goal: Goal;
  onClose: () => void;
  isOpen: boolean;
  onGoalDeleted: () => void;
}) {
  async function handleDelete() {
    await deleteGoal(goal.id || "");
    onClose();
    onGoalDeleted();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Goal">
      <div className="flex flex-col gap-4">
        <p>
          Are you sure you want to delete this goal? This action cannot be
          undone.
        </p>
        <Button color="bg-red-500" onClick={() => handleDelete()}>
          Delete
        </Button>
        <Button color="bg-gray-500" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
