import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { LogoutButton } from "@/components/sidebar/LogoutButton";
import { Typography } from "@/components/common/Typography";

interface IProps {
  avatar?: string;
  name?: string;
  isProfileActive: boolean;
  setIsProfileActive: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({
  avatar,
  name,
  setIsProfileActive,
  isProfileActive,
}: IProps) => {
  return (
    <div
      className={
        "bg-formBackground min-h-screen w-1/5 flex flex-col justify-between"
      }
    >
      <div className="w-full ">
        <div className={"flex flex-col items-center mt-5"}>
          <Image
            src={`${avatar ? avatar : ""}`}
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
          className={`w-full px-4 py-2 bg-${isProfileActive ? "buttonColor" : "none"} text-textWhite cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-700 flex h-20 text-center items-center mt-5`}
        >
          <Image
            src={"/img/sidebarProfileIcon.svg"}
            alt={""}
            width={30}
            height={29}
            className={"mr-4"}
          />
          <Typography variant={"h3"} className={"text-textWhite"}>
            Profile
          </Typography>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};
