declare type NotifyFn = (message: string, options?: { id: string }) => string

interface INotifier {
  notifyError: NotifyFn
  notifyWarning: NotifyFn
  notifyInfo: NotifyFn
  notifySuccess: NotifyFn
  notifyLoading: NotifyFn
  dismiss: (id: string) => void
  dismissAll: () => void
}
export default INotifier
