import { SetStateAction } from "react";

interface Props {
  selectedId: string | null;
  onEntityDelete: (profileId: string) => Promise<void>;
  setIsConfirmOpen: (value: SetStateAction<boolean>) => void;
}

export const ConfirmDelete = ({
  setIsConfirmOpen,
  onEntityDelete,
  selectedId,
}: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <p className="text-lg font-semibold mb-4">
          Are you sure you want to delete profile?
        </p>
        <div className="flex justify-around">
          <button
            onClick={() => {
              if (selectedId) {
                onEntityDelete(selectedId);
              }
            }}
            className={`
        w-1/3 py-2 bg-editButtonColor text-white font-bold rounded-lg hover:bg-[#7cc47a] focus:outline-none focus:ring-2 focus:ring-[#7cc47a] mx-auto block transition
      `}
          >
            Yes
          </button>
          <button
            onClick={() => setIsConfirmOpen(false)}
            className={`
        w-1/3 py-2 bg-buttonColor text-white font-bold rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 mx-auto block transition
      `}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
