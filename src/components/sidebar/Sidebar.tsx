import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { LogoutButton } from "@/components/sidebar/LogoutButton";
import { Typography } from "@/components/common/Typography";
import { useRouter } from "next/navigation";
import { Role } from "@/types/IUser";

interface IProps {
  avatar?: string;
  name?: string;
  id?: string;
  role?: Role;
  isProfileActive: boolean;
  setIsProfileActive: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({
  avatar,
  name,
  role,
  id,
  setIsProfileActive,
  isProfileActive,
}: IProps) => {
  const router = useRouter();

  return (
    <div
      className={
        "bg-formBackground min-h-screen w-1/5 flex flex-col justify-between"
      }
    >
      <div className="w-full">
        <div className={"flex flex-col items-center mt-5"}>
          <Image
            src={`${avatar ? avatar : ""}`}
            alt={"avatar"}
            className={"rounded-full object-cover"}
            width={96}
            height={96}
          />
          <div className={"text-textWhite"}>{name}</div>
        </div>
        <div
          className="w-full px-4 py-2 text-textWhite cursor-pointer flex items-center mt-5"
          onClick={() => router.push(`/${role}/${id}/profiles`)}
        >
          <Image
            src="/img/sidebarProfileIcon.svg"
            alt={""}
            width={30}
            height={29}
            className={"mr-4"}
          />
          <Typography variant={"h3"} className={"text-textWhite"}>
            Profile
          </Typography>
        </div>
        {role === Role.Admin && (
          <>
            <div
              className="w-full px-4 py-2 text-textWhite cursor-pointer flex items-center mt-5"
              onClick={() => router.push(`/${role}/${id}/users`)}
            >
              <Image
                src="/img/usersIcon.svg"
                alt=""
                width={30}
                height={29}
                className="mr-4"
              />
              <Typography variant="h3" className="text-textWhite">
                Users
              </Typography>
            </div>
            <div
              className="w-full px-4 py-2 text-textWhite cursor-pointer flex items-center mt-5"
              onClick={() => router.push(`/${role}/${id}/dashboard`)}
            >
              <Image
                src="/img/dashboardIcon.svg"
                alt=""
                width={30}
                height={29}
                className="mr-4"
              />
              <Typography variant="h3" className="text-textWhite">
                Dashboard
              </Typography>
            </div>
          </>
        )}
      </div>
      <LogoutButton />
    </div>
  );
};
