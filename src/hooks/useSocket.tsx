import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IUser } from "@/types/IUser";
import { useGetUserNotificationsQuery } from "@/lib/api/usersApi";
import { INotification } from "@/types/INotification";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
);

export const useSocket = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [user, setUser] = useState<IUser | null>(null);

  const { data: notificationsData } = useGetUserNotificationsQuery({
    userId,
  });

  useEffect(() => {
    if (!userId) return;

    if (notificationsData) {
      setNotifications(
        notificationsData.map(
          (n: INotification) => `🔔 ${n.message}: ${JSON.stringify(n.changes)}`,
        ),
      );
    }

    socket.emit("registerUser", userId);

    const handleUserUpdated = (data: {
      message: string;
      changes: object;
      user: IUser;
    }) => {
      setNotifications((prev) => [
        ...prev,
        `🔔 ${data.message}: ${JSON.stringify(data.changes)}`,
      ]);

      if (data.user) {
        setUser((prevUser) => ({
          ...prevUser,
          ...data.user,
        }));
        console.log("Updated user:", data.user);
      }
    };

    socket.on("userUpdated", handleUserUpdated);

    return () => {
      socket.off("userUpdated", handleUserUpdated);
    };
  }, [userId, notificationsData]);

  return { notifications, user };
};
