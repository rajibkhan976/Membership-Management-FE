import { NotificationClient, NotificationProvider, NotificationProviderProps } from './Notification'

//import NoticeProvider, { NoticeProviderProps } from "./NoticeProvider";
const createNotificationClient = () => {
  return new NotificationClient()
}
export { createNotificationClient as default, NotificationProvider, NotificationClient }
export type { NotificationProviderProps }
