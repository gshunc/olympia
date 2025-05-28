"use client";

import {
  faCaretRight,
  faBoxArchive,
  faMagnifyingGlass,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Goal } from "@/app/goals/actions";
import Link from "next/link";
import DeleteGoalModal from "./DeleteGoalModal";
import Button from "../ui/Button";

export default function GoalCard({
  goal,
  onGoalDeleted,
}: {
  goal: Goal;
  onGoalDeleted: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200 flex flex-col">
      <button
        className="w-full flex flex-row justify-between items-center gold-border p-4 shadow-sm hover:bg-gray-200 transition-color"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="text-gray-900 text-xl font-semibold">{goal.name}</div>
        <div className="flex flex-row gap-4 items-center">
          <Link
            className={`gold-button rounded-lg items-center transition-opacity duration-300 ${
              open ? "opacity-0 invisible" : "opacity-100"
            }`}
            href={`/goals/details/${goal.id}`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
          <div className="text-gray-900 text-xl font-semibold">
            <FontAwesomeIcon
              className={`open-icon ${open ? "open" : ""}`}
              icon={faCaretRight}
            />
          </div>
        </div>
      </button>

      <div
        className={`text-sm text-gray-800 goal-info ${
          open ? "open p-4" : ""
        } flex flex-row justify-between items-center w-full `}
      >
        <div>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {goal.description}
          </p>
          <p>
            <span className="font-semibold">Created at:</span>{" "}
            {new Date(goal.created_at || "").toLocaleString()}
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <Link
            className="text-white gold-button rounded-lg flex flex-row gap-2 items-center"
            href={`/goals/details/${goal.id}`}
          >
            <span className="font-semibold">Inspect</span>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
          {/* Archive Goal */}
          <Button color="bg-gray-500" onClick={() => {}}>
            <span className="font-semibold">Archive</span>
            <FontAwesomeIcon icon={faBoxArchive} />
          </Button>
          {/* Delete Goal */}
          <Button color="bg-red-500" onClick={openDeleteModal}>
            <span className="font-semibold">Delete </span>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </div>
      {deleteModalOpen && (
        <DeleteGoalModal
          goal={goal}
          onClose={closeDeleteModal}
          isOpen={deleteModalOpen}
          onGoalDeleted={onGoalDeleted}
        />
      )}
    </div>
  );
}
