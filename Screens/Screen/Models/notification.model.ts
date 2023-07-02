import {User} from './user.model';

export const URL_GET_NOTIFICATIONS = 'notificationHistory/user/';

export interface NotificationResponse {
  id: number;
  user: User;
  title: string;
  content: string;
  imgUrl: string;
  type: string;
  isRead: boolean;
  date: string;
}
