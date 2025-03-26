import { useState } from "react";
import { ConfirmDelete } from "@/components/common/ConfirmDelete";

interface IProps<T> {
  entity: T;

  onEntityEdit: (user: T) => void;
  onEntityDelete: (entityId: string) => Promise<void>;
}

export const HoveredProfileSection = <T,>({
  entity,
  onEntityEdit,
  onEntityDelete,
}: IProps<T>) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div className="absolute top-0 bottom-0 left-0 w-full flex justify-between border rounded-xl ">
      <button
        onClick={() => onEntityEdit(entity)}
        className="bg-editButtonColor text-formBackground p-2 rounded-l-xl hover:bg-textWhite transition w-1/2"
      >
        Edit
      </button>
      <button
        onClick={() => {
          setSelectedUserId((entity as { _id: string })._id);
          setIsConfirmOpen(true);
        }}
        className="bg-buttonColor text-formBackground p-2 rounded-r-xl hover:bg-textWhite transition w-1/2"
      >
        Delete
      </button>

      {isConfirmOpen && (
        <ConfirmDelete
          onEntityDelete={onEntityDelete}
          selectedId={selectedUserId}
          setIsConfirmOpen={setIsConfirmOpen}
        />
      )}
    </div>
  );
};
