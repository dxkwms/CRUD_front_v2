import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

export const PrivateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const pathname = usePathname();
  useEffect(() => {
    if (!isAuth) {
      if (pathname !== "auth/signin" && pathname !== "auth/signup") {
        router.push("auth/signin");
      }
    } else {
      if (pathname === "auth/signin" || pathname === "auth/signup") {
        router.push("/profile");
      }
    }
  }, [isAuth, pathname, router]);

  if (!isAuth) return null;

  return <>{children}</>;
};
