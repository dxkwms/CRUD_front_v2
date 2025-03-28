import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { LogoutButton } from "@/components/sidebar/LogoutButton";
import { useRouter, usePathname } from "next/navigation";
import { Role } from "@/types/IUser";
import { SidebarNavigationButton } from "@/components/sidebar/SidebarNavigationButton";

interface IProps {
  avatar?: string;
  name?: string;
  id?: string;
  role?: Role;
  isProfileActive: boolean;
  isUsersActive: boolean;
  isDashboardActive: boolean;
  setIsProfileActive: Dispatch<SetStateAction<boolean>>;
  setIsUsersActive: Dispatch<SetStateAction<boolean>>;
  setIsDashboardActive: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({
  avatar,
  name,
  role,
  id,
  setIsProfileActive,
  isProfileActive,
  isDashboardActive,
  setIsUsersActive,
  setIsDashboardActive,
  isUsersActive,
}: IProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsProfileActive(pathname.includes("profiles"));
    setIsUsersActive(pathname.includes("users"));
    setIsDashboardActive(pathname.includes("dashboard"));
  }, [pathname, setIsProfileActive, setIsUsersActive, setIsDashboardActive]);

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
        <SidebarNavigationButton
          isUsersActive={isProfileActive}
          clickEvent={() => router.push(`/${role}/${id}/profiles`)}
        >
          Profiles
        </SidebarNavigationButton>
        {role === Role.Admin && (
          <>
            <SidebarNavigationButton
              isUsersActive={isUsersActive}
              clickEvent={() => router.push(`/${role}/${id}/users`)}
            >
              Users
            </SidebarNavigationButton>
            <SidebarNavigationButton
              isUsersActive={isDashboardActive}
              clickEvent={() => router.push(`/${role}/${id}/dashboard`)}
            >
              Dashboard
            </SidebarNavigationButton>
          </>
        )}
      </div>
      <LogoutButton />
    </div>
  );
};
