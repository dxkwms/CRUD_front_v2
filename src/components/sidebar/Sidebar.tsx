import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { LogoutButton } from "@/components/sidebar/LogoutButton";

interface IProps {
  avatar: string | undefined;
  name: string | undefined;
  isProfileActive: boolean;
  setIsProfileActive: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({
  avatar,
  name,
  setIsProfileActive,
  isProfileActive,
}: IProps) => {
  console.log(avatar);
  return (
    <div
      className={
        "bg-formBackground h-screen w-1/5 flex flex-col justify-between"
      }
    >
      <div className="w-full">
        <div className={"flex flex-col items-center mt-5"}>
          <Image
            src={`${avatar}`}
            alt={"avatar"}
            className={"rounded-full object-cover "}
            width={96}
            height={96}
          />
          <div className={"text-textWhite"}>{name}</div>
        </div>
        <div
          onClick={() => {
            setIsProfileActive((prevState) => !prevState);
          }}
          className={`w-full px-4 py-2 bg-${isProfileActive ? "buttonColor" : "none"} text-${isProfileActive ? "gray-800" : "textWhite"} cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-700`}
        >
          fwq
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};
