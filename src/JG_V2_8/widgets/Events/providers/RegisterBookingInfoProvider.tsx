import { CompBaseProps } from '@comps/uiComps'
import { MemberType } from '@jg/common/types'
import _ from 'lodash'
import { createContext, useContext } from 'react'
import { number } from 'yup'
import { StoreApi, createStore, useStore } from 'zustand'
import shallow from 'zustand/shallow'

type RegisterBookingInfoForm = {
  deleted?: boolean
  id: number
  index: number
  name: string
  member: MemberType
  bookingItemIndex: number
  //onClear?: (entityId: number, formIndex: number) => void
}
interface RegisterBookingInfoStorage {
  //bookFor: MemberType[]
  // defaultAnswerIndex: -1
  //answers: any[]
  getForms: () => RegisterBookingInfoForm[]
  // getMemberIndex: (memberDocId: number) => number
  getFormCountByMember: (memberDocId: number) => number
  getFormCount: () => number
  forms: RegisterBookingInfoForm[]
  addForm: (form: RegisterBookingInfoForm) => void
  removeForm: (index: number) => void
  updateFrom: (id: number, globalIndex: number) => void
}
const getStorage = () => {
  const RegisterBookingInfoStore = createStore<RegisterBookingInfoStorage>((set, get) => ({
    getForms: () => {
      return get().forms
    },
    forms: [],
    addForm: (form: RegisterBookingInfoForm) => {
      const tobeUpdated = [...get().forms]

      set({ forms: [...tobeUpdated, ...[form]] })
    },
    removeForm: (id) => {
      const tobeUpdated = [...get().forms]
      for (let i = tobeUpdated.length - 1; i > -1; i--) {
        if (tobeUpdated[i].member.DocId === id) {
          tobeUpdated.splice(i, 1)
          // tobeUpdated[i].deleted = true
          break
        }
      }

      // tobeUpdated.splice(index, 1)
      set({ forms: tobeUpdated })
      //  fireChange()
    },
    getFormCountByMember: (memberDocId) => {
      const res = get().forms.filter((e) => e.member.DocId === memberDocId)
      return res.length
    },
    getFormCount: () => {
      return get().forms.length
    },
    updateFrom: (id, bookingItemIndex) => {
      const tobeUpdated = [...get().forms]
      for (let i = tobeUpdated.length - 1; i > -1; i--) {
        if (tobeUpdated[i].id === id) {
          tobeUpdated[i].bookingItemIndex = bookingItemIndex

          break
        }
      }

      // tobeUpdated.splice(index, 1)
      set({ forms: tobeUpdated })
      //  fireChange()
    },
  }))
  return RegisterBookingInfoStore
}
interface IRegisterBookingInfoStoreContext {
  store: StoreApi<RegisterBookingInfoStorage>
}

const RegisterBookingInfoStoreContext = createContext<IRegisterBookingInfoStoreContext>({
  store: getStorage(),
})

export const useRegisterBookingInfoStoreContext = (
  selector: (state: RegisterBookingInfoStorage) => Partial<RegisterBookingInfoStorage>
): RegisterBookingInfoStorage => {
  const { store } = useContext(RegisterBookingInfoStoreContext)
  const deafultStore: RegisterBookingInfoStorage = {
    // bookFor: [{ DocId: -1, MID: '', Country: '' }],
    // defaultAnswerIndex: -1,
    // answers: [],
    forms: [],
    removeForm: function (index: number): void {
      throw new Error('Function not implemented.')
    },
    addForm: function (form: { name: string }): void {
      throw new Error('Function not implemented.')
    },
    getFormCountByMember: function (memberDocId: number): number {
      throw new Error('Function not implemented.')
    },
    getFormCount: function (): number {
      throw new Error('Function not implemented.')
    },

    getForms: function (): RegisterBookingInfoForm[] {
      throw new Error('Function not implemented.')
    },
    updateFrom: function (id: number, bookingItemIndex: number): void {
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
type RegisterBookingInfoProviderProps = CompBaseProps & {
  //bookFor: MemberType[]
  //answers: []
}
const RegisterBookingInfoProvider = ({ children }: RegisterBookingInfoProviderProps) => {
  return (
    <RegisterBookingInfoStoreContext.Provider value={{ store: getStorage() }}>
      {children}
    </RegisterBookingInfoStoreContext.Provider>
  )
}
export default RegisterBookingInfoProvider
