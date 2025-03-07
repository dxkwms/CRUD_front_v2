import { PropsWithChildren, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/types/RootState";
import { ROUTES } from "@/types/routesEnum";

export const PrivateProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuth) {
      if (pathname !== ROUTES.SIGN_IN && pathname !== ROUTES.SIGN_UP) {
        router.push(ROUTES.SIGN_IN);
      }
    } else {
      if (pathname === ROUTES.SIGN_IN || pathname === ROUTES.SIGN_UP) {
        router.push("/profile");
      }
    }
  }, [isAuth, pathname, router]);

  if (!isAuth) return null;

  return <>{children}</>;
};
