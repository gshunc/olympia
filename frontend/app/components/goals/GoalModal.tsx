"use client";

import { useState } from "react";
import Modal from "../Modal";
import { addGoal, Goal } from "@/app/goals/actions";

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoalAdded: () => void;
}

export default function GoalModal({
  isOpen,
  onClose,
  onGoalAdded,
}: GoalModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const goal: Goal = {
        name: name.trim(),
        description: description.trim(),
      };

      await addGoal(goal);

      // Reset form
      setName("");
      setDescription("");
      onClose();

      // Refresh the goals data
      onGoalAdded();
    } catch (error) {
      console.error("Error adding goal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Goal">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="goal-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Goal Name
          </label>
          <input
            id="goal-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter goal name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label
            htmlFor="goal-description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="goal-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your goal"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 gold-button disabled:opacity-50"
            disabled={isSubmitting || !name.trim() || !description.trim()}
          >
            {isSubmitting ? "Creating..." : "Create Goal"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
