import { CompBaseProps } from '@comps/uiComps'
import createNotificationClient, { NotificationProvider } from '@jg/_core/services/notification'
import { useContext } from 'react'

const noticeClient = createNotificationClient()

export const useEmailAndComRootNotification = () => {
  return useContext(noticeClient.context)
}

const EmailAndComNotificationProvider = ({ children }: CompBaseProps) => {
  return <NotificationProvider client={noticeClient}>{children}</NotificationProvider>
}

export default EmailAndComNotificationProvider
