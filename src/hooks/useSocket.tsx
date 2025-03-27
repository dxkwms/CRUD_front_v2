import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IUser } from "@/types/IUser";
import { useGetUserNotificationsQuery } from "@/lib/api/usersApi";
import { INotification } from "@/types/INotification";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/slice/userSlice";
import { formatChange } from "@/utils/formatChange";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
);

export const useSocket = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<
    { message: string; isRead: boolean; date: string }[]
  >([]);
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
      ...notificationsData.map((n: INotification) => ({
        message: `🔔 ${n.message}: ${formatChange(n.changes)} Updated by: ${n.updatedBy}`,
        isRead: n.read,
        date: n.createdAt,
      })),
    ]);
  }, [notificationsData]);

  useEffect(() => {
    if (!userId) return;

    const onUserUpdated = (data: {
      message: string;
      changes: object;
      user: IUser;
      updatedBy: string;
      createdAt: string;
    }) => {
      setNotifications((prev) => [
        ...prev,
        {
          message: `🔔 ${data.message}: ${formatChange(data.changes)} Updated by: ${data.updatedBy}`,
          isRead: false,
          date: data.createdAt,
        },
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

  const markAsRead = (index: number) => {
    setNotifications((prev) => {
      const newNotifications = [...prev];
      newNotifications[index].isRead = true;
      return newNotifications;
    });
  };

  const sortedNotifications = notifications.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return { sortedNotifications, markAsRead };
};
