import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IUser } from "@/types/IUser";
import { useGetUserNotificationsQuery } from "@/lib/api/usersApi";
import { INotification } from "@/types/INotification";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/slice/userSlice";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
);

export const useSocket = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { data: notificationsData } = useGetUserNotificationsQuery({ userId });

  useEffect(() => {
    if (!userId) return;

    socket.emit("registerUser", userId);

    return () => {
      socket.off("userUpdated");
    };
  }, [userId]);

  useEffect(() => {
    if (!notificationsData) return;
    setNotifications((prev) => [
      ...prev,
      ...notificationsData.map(
        (n: INotification) =>
          `🔔 ${n.message}: ${JSON.stringify(n.changes)} Updated by: ${n.updatedBy}`,
      ),
    ]);
  }, [notificationsData]);

  useEffect(() => {
    if (!userId) return;

    const onUserUpdated = (data: {
      message: string;
      changes: object;
      user: IUser;
      updatedBy: string;
    }) => {
      setNotifications((prev) => [
        ...prev,
        `🔔 ${data.message}: ${JSON.stringify(data.changes)} Updated by: ${data.updatedBy}`,
      ]);

      if (data.user) {
        dispatch(setUser(data.user));
      }
    };

    socket.on("userUpdated", onUserUpdated);

    return () => {
      socket.off("userUpdated", onUserUpdated);
    };
  }, [dispatch, userId]);

  return { notifications };
};
