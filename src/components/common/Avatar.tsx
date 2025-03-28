import Image from "next/image";
import { Typography } from "@/components/common/Typography";
import { Dispatch, SetStateAction, useRef } from "react";

interface Props {
  avatar?: File | null | string;
  setAvatar: Dispatch<SetStateAction<File | null>>;
}

export const Avatar = ({ avatar, setAvatar }: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onAvatarClick = () => {
    if (!inputFileRef.current) {
      return;
    }

    inputFileRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={inputFileRef}
        onChange={(e) => {
          if (e.target.files) {
            setAvatar(e.target.files?.[0]);
          }
        }}
        className="hidden"
      />
      <div className="flex justify-center mt-6">
        <div
          onClick={onAvatarClick}
          className="cursor-pointer w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden"
        >
          <div className="cursor-pointer">
            <Image
              src={
                avatar instanceof File
                  ? URL.createObjectURL(avatar)
                  : avatar || "/img/defaultAvatar.png"
              }
              alt="Avatar"
              className="object-cover"
              width={120}
              height={120}
            />
          </div>
        </div>
      </div>{" "}
      <Typography variant="caption" className="mt-2 text-center text-gray-800">
        Choose picture
      </Typography>
    </>
  );
};
