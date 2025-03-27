import { SetStateAction, useRef } from "react";
import { Typography } from "@/components/common/Typography";
import { CommonButton } from "@/components/common/CommonButton";
import { useOutsideDetect } from "@/hooks/common/useOutsideDetect";
import { FormWrapper } from "@/common/FormWrapper";

interface Props {
  selectedId?: string;
  deleteEntityName: string;
  onEntityDelete: (profileId: string) => Promise<void>;
  setIsConfirmOpen: (value: SetStateAction<boolean>) => void;
}

export const ConfirmDelete = ({
  setIsConfirmOpen,
  onEntityDelete,
  deleteEntityName,
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
    <FormWrapper>
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80 text-center"
        ref={wrapperRef}
      >
        <Typography className="text-lg mb-4 text-[#12130F]">
          Are you sure you want to delete {deleteEntityName}?
        </Typography>
        <div className="flex justify-around">
          <CommonButton
            clickedFn={() => {
              if (selectedId) {
                onEntityDelete(selectedId);
                setIsConfirmOpen(true);
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
    </FormWrapper>
  );
};
