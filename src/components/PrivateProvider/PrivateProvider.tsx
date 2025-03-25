import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/RootState";
import { ROUTES } from "@/types/routesEnum";
import { setUser } from "@/lib/slice/userSlice";
import { useGetUserByTokenQuery } from "@/lib/api/usersApi";

export const PrivateProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("token");
  const { data: userData, isLoading } = useGetUserByTokenQuery(accessToken, {
    skip: !accessToken,
  });

  const userDataToFix = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (isAuth && userData) {
      dispatch(setUser(userData));
    } else {
      router.replace(`${ROUTES.SIGN_IN}`);
    }
  }, [isAuth, userData]);

  if (isAuth && (isLoading || !userDataToFix)) return <div>Loading...</div>;

  return <>{children}</>;
};
