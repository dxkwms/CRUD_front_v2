import { useSocket } from "@/hooks/useSocket";

export const NotificationBar = ({ userId }: { userId: string | undefined }) => {
  const { notifications } = useSocket(userId);

  return (
    <div className="fixed top-4 right-4 w-64 bg-gray-800 text-white p-4 rounded shadow-lg">
      <h3 className="text-lg font-semibold">Notifications</h3>
      {notifications.length > 0 ? (
        <ul className="mt-2">
          {notifications.map((msg, index) => (
            <li key={index} className="mt-1">
              {msg}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};
