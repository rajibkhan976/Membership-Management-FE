import { CompBaseProps } from '@comps/uiComps'
import GetClubListByMemberRequest from '@jg/common/dataAPIs/member/GetClubListByMemberRequest'
import GetFamilyMemberRequest from '@jg/common/dataAPIs/member/GetFamilyMemberRequest'
import { MemberType } from '@jg/common/types'
import { ClubInfoType } from '@jg/common/types/club/ClubInfoType'
import { FamilyInfoType } from '@jg/common/types/member/FamilyInfoType'
import { User } from '@jg/store/store'
import { createContext, useContext } from 'react'
import { StoreApi, createStore, useStore } from 'zustand'

interface UserProfileStorage {
  userInfo: User | null
  //setUserInfo: (userInfo: User) => void
  familyInfo: FamilyInfoType | null
  joindClubs?: number[]
  administrativeClubs: ClubInfoType[] | null
  memberInfo?: MemberType
  loadFamilyInfo: (callback?: () => void) => void
  loadAdministrativeClubs: (callback?: () => void) => void
}
//const member = (window as any).px.sessionMember as MemberType

interface ISessionUserContext {
  store: StoreApi<UserProfileStorage>
  userInfo: User | null
}

const getContextStore = (userInfo: User | null) => {
  const UserProfileStore = createStore<UserProfileStorage>((set, get) => ({
    userInfo: userInfo,
    familyInfo: null,
    administrativeClubs: null,
    loadFamilyInfo: (callback) => {
      if (get().familyInfo === null) {
        GetFamilyMemberRequest({ memberDocId: get().userInfo?.MemberDocId || -1 }).then((res) => {
          set({ familyInfo: res.family })
          callback?.()
        })
      }
    },
    loadAdministrativeClubs: (callback) => {
      if (get().administrativeClubs === null) {
        GetClubListByMemberRequest({ switchType: 'clubteam' }).then((res) => {
          set({ administrativeClubs: res.clubs })
          callback?.()
        })
      }
    },
  }))
  return UserProfileStore
}

const SessionUserContext = createContext<ISessionUserContext>({ store: getContextStore(null), userInfo: null })

export const useSessionUserContext = () => {
  const { store, userInfo } = useContext(SessionUserContext)
  //const userInfo = useStore(store, (state) => state.userInfo)
  const loadFamilyInfo = useStore(store, (state) => state.loadFamilyInfo)
  const familyInfo = useStore(store, (state) => state.familyInfo)
  const administrativeClubs = useStore(store, (state) => state.administrativeClubs)
  const loadAdministrativeClubs = useStore(store, (state) => state.loadAdministrativeClubs)
  return { userInfo, loadFamilyInfo, familyInfo, administrativeClubs, loadAdministrativeClubs }
}

const SessionUserProvider = ({ children, userInfo }: { userInfo: User } & CompBaseProps) => {
  return (
    <SessionUserContext.Provider value={{ store: getContextStore(userInfo), userInfo }}>
      {children}
    </SessionUserContext.Provider>
  )
}
export default SessionUserProvider
