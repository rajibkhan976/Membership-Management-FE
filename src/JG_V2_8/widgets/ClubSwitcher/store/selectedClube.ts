import create from 'zustand'
import { ClubSwitcherInfo } from '@jg/common/types'

export interface ClubSwitcherStore {
    club: ClubSwitcherInfo | null
    jgPack: string | null
    isNgb: boolean,
    setClub: (club: ClubSwitcherInfo, jgPack: string) => void
}

const useGetSelectedClub = create<ClubSwitcherStore>((set) => ({
    club: null,
    jgPack: null,
    isNgb: false,
    setClub: (club: ClubSwitcherInfo, jgPack: string) => {
        set({ club, jgPack, isNgb: jgPack === 'pro' || club?.entityType === null })
        // || club?.entityType === null

    }
}))

export default useGetSelectedClub
