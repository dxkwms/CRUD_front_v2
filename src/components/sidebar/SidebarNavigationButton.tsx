import Image from "next/image";
import { Typography } from "@/components/common/Typography";
import { ReactNode } from "react";

interface IProps {
  isUsersActive: boolean;
  children?: ReactNode;

  clickEvent: () => void;
}

export const SidebarNavigationButton = ({
  clickEvent,
  children,
  isUsersActive,
}: IProps) => {
  return (
    <div
      className={`w-full px-4 py-2 cursor-pointer flex items-center mt-5 ${isUsersActive ? "bg-buttonColor" : "text-textWhite"}`}
      onClick={() => clickEvent()}
    >
      <Image
        src="/img/usersIcon.svg"
        alt=""
        width={30}
        height={29}
        className="mr-4"
      />
      <Typography variant="h3" className="text-textWhite">
        {children}
      </Typography>
    </div>
  );
};
