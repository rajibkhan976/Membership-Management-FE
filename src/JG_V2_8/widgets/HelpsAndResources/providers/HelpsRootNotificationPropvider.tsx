import { CompBaseProps } from '@comps/uiComps'
import createNotificationClient, { NotificationProvider } from '@jg/_core/services/notification'
import { useContext } from 'react'

//export  {context as HelpsRootNoticeContext} ;
const noticeClient = createNotificationClient()
export const useHelpsRootNotification = () => {
  return useContext(noticeClient.context)
}
const HelpsRootNotificationPropvider = ({ children }: CompBaseProps) => {
  return <NotificationProvider client={noticeClient}>{children}</NotificationProvider>
}
export default HelpsRootNotificationPropvider
