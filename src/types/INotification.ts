export interface INotification {
  userId: string;
  message: string;
  changes: object;
  read: boolean;
  updatedBy: string;
  createdAt: string;
}
