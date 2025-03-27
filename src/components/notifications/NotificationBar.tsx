import { useSocket } from "@/hooks/useSocket";
import { Typography } from "@/components/common/Typography";
import { NotificationSection } from "@/components/notifications/NotificationSection";

export const NotificationBar = ({ userId }: { userId: string | undefined }) => {
  const { notifications } = useSocket(userId);

  return (
    <div
      className={`fixed shadow-[0px_0px_10px_4px_rgba(0,_0,_0,_0.1)] top-4 right-4 w-64 bg-textWhite text-black p-4 rounded max-h-[50vh] overflow-y-auto`}
    >
      <Typography variant={"h3"} className={"flex justify-self-center"}>
        Notifications
      </Typography>
      {notifications.length > 0 ? (
        <ul className="mt-2">
          {notifications.map((note, index) => (
            <NotificationSection note={note} />
          ))}
        </ul>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};
