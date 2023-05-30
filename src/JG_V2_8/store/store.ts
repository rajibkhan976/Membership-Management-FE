import { IsBlended } from '@jg/_core/Authorization'
import create from 'zustand'
/* interface BearState {
  bears: number
  increase: (by: number) => void
}

const useStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
})) */

type ViewDfn = {
  path: string
  name: string
  title?: string
  config: object
}
type ViewHash = {
  [key: string]: ViewDfn[]
}
export type User = {
  UserId: number
  LoginId: string
  EmailAddress: string
  FirstName: string
  LastName: string
  Gender?: string
  Mobile: string
  ForceResetPassword: boolean
  ProfilePicURL: string
  DOB: Date
  Address1: string
  Address2: string
  Address3: string
  Town: string
  County: string
  Country: string
  PostCode: string
  Title: string
  Currency: string
  MID: string
  MemberDocId: number
  ParentFirstName: string
  ParentLastName: string
  ParentEmailAddress: string
  ParentEmailVerified: Date
  EmailVerified: Date
  ParentalOverrideUser: number
  ParentalOverrideDate: Date
  SourceUserId: number
  ExtranalAuthenticationConfig: string
  Name: string
  Comments: string
}

interface AppStorage {
  IsDev: boolean
  CurrentUser: User | null
  SystemSettings: { [key: string]: string }
  AppStartPath: string
  BaseAppPath: string
  SetBaseAppPath: (path: string) => void
  Areas: string[]
  Views: ViewHash
  CurrentView?: ViewDfn
  SetCurrentView: (viewName: string, areaName: string) => void
  SetCurrentUser: (currentUser: User) => void
  SetSystemSettings: (systemSettings: { [key: string]: string }) => void
  SetAppStartPath: (path: string) => void
  RegisterAreas: (areas: string[]) => void
  RegisterViews: (area: string, views: ViewDfn[]) => void
  RenderedRoutes: string[]
  UpdateRenderedRoutes: (path: string) => void
  BBarOffsetSize: number
  SetBBarOffsetSize: (offsetSize: number) => void
}

const AppStore = create<AppStorage>()((set, get) => ({
  IsDev: !IsBlended(),
  BaseAppPath: '/',
  SetBaseAppPath: (path) => {
    set(() => {
      return { BaseAppPath: path }
    })
  },
  CurrentUser: null,
  SystemSettings: {},
  AppStartPath: '',
  Areas: [],
  Views: { Default: [] },
  CurrentView: undefined,
  SetCurrentView: (viewName, areaName) => {
    const viewByArea = get().Views[areaName]
    const view = viewByArea.find((e) => e.path === `/${viewName}/`)
    if (get().CurrentView?.name !== view?.name) {
      set(() => {
        return { CurrentView: view }
      })
    }
  },
  SetCurrentUser: (currentUser) => {
    set(() => {
      return { CurrentUser: currentUser }
    })
  },
  SetSystemSettings: (systemSettings: { [key: string]: string }) =>
    set(() => {
      return { SystemSettings: systemSettings }
    }),
  SetAppStartPath: (path: string) => set(() => ({ AppStartPath: path })),
  RegisterAreas: (areas: string[]) => set((state: any) => ({ Areas: state.Areas.concat(areas) })),
  RegisterViews: (area: string, views: object[]) =>
    set((state: any) => {
      if (!state.Views[area]) state.Views[area] = []
      state.Views[area] = state.Views[area].concat(views)
      return { Views: state.Views }
    }),
  RenderedRoutes: [],
  UpdateRenderedRoutes: (path: string) =>
    set((state: any) => {
      state.RenderedRoutes = state.RenderedRoutes.concat([path])
      return { RenderedRoutes: state.RenderedRoutes }
    }),
  // addViews:
  BBarOffsetSize: 0,
  SetBBarOffsetSize: (offsetSize: number) => {
    set((state) => {
      return { BBarOffsetSize: offsetSize }
    })
  },
}))

export default AppStore
