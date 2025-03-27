import { useSocket } from "@/hooks/useSocket";
import { Typography } from "@/components/common/Typography";
import { NotificationSection } from "@/components/notifications/NotificationSection";
import { useRef, useState } from "react";
import Image from "next/image";
import { useOutsideDetect } from "@/hooks/common/useOutsideDetect";

export const NotificationBar = ({ userId }: { userId: string | undefined }) => {
  const { sortedNotifications, markAsRead } = useSocket(userId);
  const [isShowNotifications, setIsShowNotifications] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideDetect({
    ref: wrapperRef,
    setIsListOpen: setIsShowNotifications,
  });

  return (
    <div className="fixed top-4 right-0 z-30">
      {!isShowNotifications && (
        <Image
          src={"/img/notificationIcon.svg"}
          alt={""}
          height={40}
          width={40}
          className={"fixed top-4 right-4 z-10 cursor-pointer"}
          onClick={() => setIsShowNotifications(true)}
        />
      )}

      {isShowNotifications && (
        <div
          className={`shadow-[0px_0px_10px_4px_rgba(0,_0,_0,_0.1)] w-[22vw] bg-textWhite text-black p-4 rounded max-h-[50vh] overflow-y-auto `}
          ref={wrapperRef}
        >
          <Typography variant={"h3"} className={"flex justify-self-center"}>
            Notifications
          </Typography>
          {sortedNotifications.length > 0 ? (
            <ul className="mt-2">
              {sortedNotifications.map((note, index) => (
                <li
                  key={index}
                  className={`${
                    note.isRead ? "" : "bg-yellow-100"
                  } p-2 rounded mb-2 cursor-pointer`}
                  onMouseEnter={() => markAsRead(index)}
                >
                  <NotificationSection note={note.message} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications</p>
          )}
        </div>
      )}
    </div>
  );
};
