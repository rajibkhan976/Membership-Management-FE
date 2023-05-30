import { EventInfo } from '@jg/common/types'
import { useCallback } from 'react'
import create, { StateCreator } from 'zustand'
import shallow from 'zustand/shallow'

type SearchRequestArg = {
  key: string
}
interface EventFinderStorage {
  searchCount: number

  searchRequestArg: SearchRequestArg
}

const useEventFinderStore = create<EventFinderStorage>((set) => ({
  searchCount: 0,
  searchRequestArg: { key: '' },
}))

export default useEventFinderStore
