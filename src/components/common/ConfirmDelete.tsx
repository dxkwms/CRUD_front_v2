import { SetStateAction, useRef } from "react";
import { Typography } from "@/components/common/Typography";
import { CommonButton } from "@/components/common/CommonButton";
import { useOutsideDetect } from "@/hooks/common/useOutsideDetect";

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
  const wrapperRef = useRef(null);
  useOutsideDetect({
    ref: wrapperRef,
    setIsListOpen: setIsConfirmOpen,
  });

  const onDeleteCancel = () => {
    setIsConfirmOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80 text-center"
        ref={wrapperRef}
      >
        <Typography className="text-lg font-semibold mb-4">
          Are you sure you want to delete profile?
        </Typography>
        <div className="flex justify-around">
          <CommonButton
            clickedFn={() => {
              if (selectedId) {
                onEntityDelete(selectedId);
              }
            }}
            className={`w-1/3`}
            variant={"apply"}
          >
            Yes
          </CommonButton>
          <CommonButton
            clickedFn={() => onDeleteCancel()}
            variant={"cancel"}
            className={"w-1/3"}
          >
            No
          </CommonButton>
        </div>
      </div>
    </div>
  );
};
