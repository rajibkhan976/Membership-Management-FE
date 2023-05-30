import { CompBaseProps } from '@comps/uiComps'
import createNotificationClient, { NotificationProvider } from '@jg/_core/services/notification'
import { useContext } from 'react'

//export  {context as EventRootNoticeContext} ;
const noticeClient = createNotificationClient()
export const useEventRootNotification = () => {
  return useContext(noticeClient.context)
}
const EventRootNotificationPropvider = ({ children }: CompBaseProps) => {
  return <NotificationProvider client={noticeClient}>{children}</NotificationProvider>
}
export default EventRootNotificationPropvider
