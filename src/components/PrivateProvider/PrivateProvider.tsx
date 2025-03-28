"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/RootState";
import { ROUTES } from "@/types/routesEnum";
import { setUser } from "@/lib/slice/userSlice";
import { useGetUserByTokenQuery } from "@/lib/api/usersApi";
import { logout } from "@/lib/slice/authSlice";

export const PrivateProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();

  const { data: userData, isLoading } = useGetUserByTokenQuery(accessToken, {
    skip: !accessToken,
  });

  useEffect(() => {
    const savedValue = localStorage.getItem("token");
    setAccessToken(savedValue ? savedValue : null);
  }, []);

  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;

  useEffect(() => {
    if (isAuth && userData) {
      dispatch(setUser(userData));
    } else if (isAuth && !userData && !isLoadingRef.current) {
      dispatch(logout());
      router.replace(`${ROUTES.SIGN_IN}`);
    } else {
      router.replace(`${ROUTES.SIGN_IN}`);
    }
  }, [isAuth, userData]);

  if (isAuth && isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};
