import { INotification } from "@/types/INotification";

export const NotificationSection = ({ note }: { note: INotification }) => {
  return <section>{note}</section>;
};
