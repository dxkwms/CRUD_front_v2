import Image from "next/image";
import { Typography } from "@/components/common/Typography";

interface Props {
  onAvatarClick: () => void;

  avatar: File | null;
}

export const Avatar = ({ onAvatarClick, avatar }: Props) => {
  return (
    <>
      <div className="flex justify-center mt-6">
        <div
          onClick={onAvatarClick}
          className="cursor-pointer w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden"
        >
          <div className="cursor-pointer">
            <Image
              src={
                avatar ? URL.createObjectURL(avatar) : "/img/defaultAvatar.png"
              }
              alt="Avatar"
              className="object-cover"
              width={120}
              height={120}
            />
          </div>
        </div>
      </div>{" "}
      <Typography variant="caption" className="mt-2 text-center ">
        Choose picture
      </Typography>
    </>
  );
};
