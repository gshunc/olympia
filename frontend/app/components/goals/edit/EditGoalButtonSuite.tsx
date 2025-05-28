"use client";

import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/app/components/ui/Button";

export default function EditGoalButtonSuite() {
  return (
    <div className="flex flex-row gap-2">
      <Button color="bg-green-500" onClick={() => {}}>
        <span className="font-semibold">Save </span>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <Button color="bg-red-500" onClick={() => {}}>
        <span className="font-semibold">Delete </span>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
  );
}
