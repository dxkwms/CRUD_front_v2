import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
);

export const useSocket = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) return;

    if (userId) {
      socket.emit("registerUser", userId.toString());
    }

    const handleUserUpdated = (data: { message: string; changes: object }) => {
      setNotifications((prev) => [
        ...prev,
        `🔔 ${data.message}: ${JSON.stringify(data.changes)}`,
      ]);
    };

    socket.on("userUpdated", handleUserUpdated);
    socket.on("profileUpdated", handleUserUpdated);

    return () => {
      socket.off("userUpdated", handleUserUpdated);
      socket.off("profileUpdated", handleUserUpdated);
    };
  }, [userId]);

  return { notifications };
};
