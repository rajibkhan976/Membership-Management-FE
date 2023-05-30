declare type NotifyFn = (message: string, options?: { id: string }) => string

interface INotification {
  notiftError: NotifyFn
  notifyWarning: NotifyFn
  notifyInfo: NotifyFn
  notifyLoading: NotifyFn
  dismiss: (id: string) => void
  dismissAll: () => void
}
export default INotification
