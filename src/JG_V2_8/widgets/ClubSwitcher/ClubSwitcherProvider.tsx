import { CompBaseProps } from '@comps/uiComps'
import { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export type ClubSwitcherEventType = 'ready' | 'onSwitch'

export type ClubSwitcherStatus = 'init' | 'pending' | 'ready'
interface ClubSwitcherContext {
  selectedClubName: string
  setSelectedClubName: (clubName: string) => void
  selectedClubDocId: number | string
  setSelectedClubDocId: (clubDocId: number | string) => void
  selectedClubMerchantId: string
  setSelectedClubMerchantId: (clubMerchantcId: string) => void
  loadingStatus: ClubSwitcherStatus
  setLoadingStatus(status: ClubSwitcherStatus): void,
  selectedClubDocIdInt: number
  setSelectedClubDocIdInt: (clubDocId: number) => void
}

const defaultContextValue: ClubSwitcherContext = {
  selectedClubName: 'Loading...',
  setSelectedClubName: (clubName) => { },
  selectedClubDocId: -1,
  setSelectedClubDocId: (clubDocId) => { },
  selectedClubMerchantId: '-1',
  setSelectedClubMerchantId: (clubMerchantcId) => { },
  loadingStatus: 'init',
  setLoadingStatus: (status) => { },
  selectedClubDocIdInt: -1,
  setSelectedClubDocIdInt: function (clubDocId: number): void {
    throw new Error('Function not implemented.')
  }
}

const Context = createContext<ClubSwitcherContext>(defaultContextValue)

export const useClubSwitcherContext = () => {
  return useContext(Context)
}

const ClubSwitcherProvider = ({ children, paramName = 'clubMerchantId' }: CompBaseProps & { paramName?: string }) => {
  //const { clubMerchantId } = useParams()
  //const { clubDocId } = useParams()
  const params = useParams()
  const clubDocId = params[paramName]
  const clubMerchantId = params[paramName]
  const [loadingStatus, setLoadingStatus] = useState<ClubSwitcherStatus>('init')
  const [selectedClubName, setSelectedClubName] = useState<string>('Loading...')
  const [selectedClubDocId, setSelectedClubDocId] = useState<number | string>((clubDocId && clubDocId) || -1)
  const [selectedClubMerchantId, setSelectedClubMerchantId] = useState<string>(clubMerchantId || '-1')
  const [selectedClubDocIdInt, setSelectedClubDocIdInt] = useState<number>(-1)
  const contextValue: ClubSwitcherContext = {
    loadingStatus: loadingStatus,
    selectedClubName: selectedClubName,
    setSelectedClubName: setSelectedClubName,
    selectedClubDocId: selectedClubDocId,
    setSelectedClubDocId: (clubDocId) => {
      setSelectedClubDocId(clubDocId)
    },
    selectedClubMerchantId: selectedClubMerchantId,
    setSelectedClubMerchantId: (clubMerchantcId) => {
      setSelectedClubMerchantId(clubMerchantcId)
    },
    setLoadingStatus: (status) => {
      setLoadingStatus(status)
    },
    selectedClubDocIdInt,
    setSelectedClubDocIdInt: function (clubDocId: number): void {
      setSelectedClubDocIdInt(clubDocId)
    }
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export default ClubSwitcherProvider
