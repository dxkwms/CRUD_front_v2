import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IUser } from "@/types/IUser";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
);

export const useSocket = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!userId) return;

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
  }, [userId]);

  return { notifications, user };
};
