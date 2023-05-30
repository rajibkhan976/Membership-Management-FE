import { Button, CompBaseProps } from '@comps/uiComps'
import { XIcon } from '@heroicons/react/outline'
import INotifier from '@jg/_core/interfaces/INotifier'
import _ from 'lodash'
import { createContext, useContext, useEffect } from 'react'
import toast, { ToastBar, Toaster, ToastPosition } from 'react-hot-toast'
export type NotifyType = 'warning' | 'info' | 'error' | 'success' | 'custom' | 'loading'
type ValidToastType = 'error' | 'success' | 'custom' | 'loading'
declare type NotificationProviderProps = CompBaseProps & {
  client: NotificationClient
}
const notify = (message: string, notifyType: NotifyType, options?: { id: string }) => {
  let position: ToastPosition = 'top-center'
  let duration = 1000000000
  let toastType: ValidToastType = 'success'
  let id
  if (options?.id) {
    id = options.id
  } else id = Math.random().toString()
  if (notifyType) {
    switch (notifyType) {
      case 'error':
        position = 'bottom-left'
        toastType = notifyType
        break
      case 'info':
        position = 'top-right'
        break
      case 'warning':
        position = 'top-center'
        break
      case 'success':
        position = 'top-right'
        duration = 3000
        toastType = notifyType
        break
      case 'loading':
        position = 'top-center'
        toastType = notifyType
        break
    }
  }
  const props = {
    position: position,
    duration: duration,
    id: id,
  }
  return notifyType == 'warning' || notifyType == 'info' ? toast(message, props) : toast[toastType](message, props)
}

const getNotifier = (noticeClient: NotificationClient): INotifier => {
  return {
    notifyWarning: function (message, options) {
      const noticeId = notify(message, 'warning', options)
      noticeClient.notificationList.push(noticeId)
      return noticeId
    },
    notifyInfo: function (message, options) {
      const noticeId = notify(message, 'info', options)
      noticeClient.notificationList.push(noticeId)
      return noticeId
    },
    notifySuccess: function (message, options) {
      const noticeId = notify(message, 'success', options)
      noticeClient.notificationList.push(noticeId)
      return noticeId
    },
    notifyLoading: function (message, options) {
      const noticeId = notify(message, 'loading', options)
      noticeClient.notificationList.push(noticeId)
      return noticeId
    },
    notifyError: function (message, options) {
      const noticeId = notify(message, 'error', options)
      noticeClient.notificationList.push(noticeId)
      return noticeId
    },
    dismiss: (id) => {
      toast.dismiss(id)
    },
    dismissAll: () => {
      //eslint-disable-next-line
      //debugger
      let count = noticeClient.notificationList.length
      while (count > 0) {
        const noticeId = noticeClient.notificationList.pop()
        toast.dismiss(noticeId)
        count--
      }
    },
  }
}
class NotificationClient {
  context: React.Context<INotifier>
  notifier: INotifier
  clientId: string
  notificationList: string[]
  constructor() {
    this.notificationList = []
    this.clientId = _.uniqueId()
    this.notifier = getNotifier(this)
    this.context = createContext<INotifier>(this.notifier)
  }
}
const NotificationProvider = (props: NotificationProviderProps) => {
  const { client, children } = props
  const ContextClient = client.context
  const context = useContext(client.context)
  useEffect(() => {
    return () => {
      context.dismissAll()
    }
  }, [])
  return (
    <ContextClient.Provider value={client.notifier}>
      {children}
      <Toaster>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <Button
                    btnSize="xs"
                    btnColor="secondary"
                    text=""
                    fillType="plain"
                    onClick={() => context.dismiss(t.id)}
                    icon={<XIcon />}
                  />
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </ContextClient.Provider>
  )
}

export { NotificationProvider, NotificationClient }
export type { NotificationProviderProps }
