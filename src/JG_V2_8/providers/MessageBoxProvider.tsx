import { CompBaseProps } from '@comps/uiComps'
import _ from 'lodash'
import createStore, { StoreApi, useStore } from 'zustand'
import shallow from 'zustand/shallow'
import { createContext, useContext } from 'react'
import StatusDialog from '@jg/common/comps/statusdialog/StatusDialog'

interface MessageBoxStorage {
  title?: string
  message?: string
  isOpen: boolean
  show: (options: { title?: string; message?: string }) => void
  close: () => void
}

const getMessageStorage = () => {
  const BookATicketStore = createStore<MessageBoxStorage>((set, get) => ({
    title: 'Modal title',
    message: 'Hello world',
    isOpen: false,
    show: ({ title, message }) => {
      set({ isOpen: true, title: title, message: message })
    },
    close: () => {
      set({ isOpen: false, title: '', message: '' })
    },
  }))
  return BookATicketStore
}

interface IBookATicketStoreContext {
  store: StoreApi<MessageBoxStorage>
}
const MessageBoxContext = createContext<IBookATicketStoreContext>({
  store: getMessageStorage(),
})

export const useMessageBoxContext = (
  selector: (state: MessageBoxStorage) => Partial<MessageBoxStorage>
): MessageBoxStorage => {
  const { store } = useContext(MessageBoxContext)
  const deafultStore: MessageBoxStorage = {
    isOpen: false,
    show: function (): void {
      throw new Error('Function not implemented.')
    },
    close: function (): void {
      throw new Error('Function not implemented.')
    },
  }
  return _.merge(
    deafultStore,
    useStore(
      store,
      (state) => {
        return selector(state)
      },
      shallow
    )
  )
}

const MessageBoxPlaceHolder = () => {
  const { close, isOpen, title, message } = useMessageBoxContext((state) => ({
    close: state.close,
    isOpen: state.isOpen,
    title: state.title,
    message: state.message,
  }))
  return (
    <StatusDialog
      isOpen={isOpen}
      setIsOpen={close}
      titleText={title}
      descriptionText={message}
      actionBtnText="Yes"
      closeBtnText={'Ok'}
      showDefaultActionBtn={false}
      handleAction={() => {
        alert('ss')
      }}
    />
  )
}

type MessageBoxProviderProps = CompBaseProps & {}
const MessageBoxProvider = ({ children }: MessageBoxProviderProps) => {
  return (
    <MessageBoxContext.Provider value={{ store: getMessageStorage() }}>
      <>
        {children}
        <MessageBoxPlaceHolder />
      </>
    </MessageBoxContext.Provider>
  )
}

export default MessageBoxProvider
