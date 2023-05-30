import create from 'zustand'
import { ClubSwitcherInfo } from '@jg/common/types'

export interface ClubSwitcherStore {
  clubs: ClubSwitcherInfo[]
  setClubs: (clubList: ClubSwitcherInfo[]) => void
}

const useClubSwitcherStore = create<ClubSwitcherStore>((set) => ({
  clubs: [],
  setClubs: (clubList: ClubSwitcherInfo[]) => set({ clubs: clubList }),
}))

export default useClubSwitcherStore
