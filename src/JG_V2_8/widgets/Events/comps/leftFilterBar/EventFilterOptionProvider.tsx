import { FadeIn } from '@comps/uiComps'

import useEventStore from '../../store/useEventStore'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import ProviderCheckboxGroup from './ProviderCheckboxGroup'

import { SearchField } from '@jg/common/comps'
import create from 'zustand'

type IProviderContext = {
  searchKey: string
  setSearchKey: (key: string) => void
}
export const useEventFilterProviderContext = create<IProviderContext>((set) => ({
  searchKey: '',
  setSearchKey: (key) => {
    set({ searchKey: key })
  },
}))

const EventFilterOptionProvider = () => {
  const filterBarData = useEventStore((state) => state.filterBarData)
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  const setSearchKey = useEventFilterProviderContext((state) => state.setSearchKey)
  const options = filterBarData?.Clubs.map((e) => {
    return {
      name: e.Name,
      value: e.DocId.toString(),
      caption: e.Address,
      isMyProvider: e.IsMyOrganization,
      providerType: e.ClubType,
    }
  })

  return (
    <FadeIn className="divide-y divide-jg-grey-200 h-full flex flex-col  ">
      <SearchField
        text={''}
        placeholder="Search "
        onClear={() => {
          // setCurrentArgs({ ...currentArgs, key: '' })
        }}
        onChange={(value) => {
          // setKey(value)
          // console.log(value)
          setSearchKey(value)
        }}
        onEnter={(value) => {
          // setCurrentArgs({ ...currentArgs, key: key })
        }}
        className="flex-grow pl-1.5 my-1 "
        type="button"
      />

      <ProviderCheckboxGroup
        className={'h-full'}
        selectedValue={getArgsFromUrl().provider || ['all']}
        onChange={(value) => {
          setCurrentArgs({ ...currentArgs, ...{ provider: value } })
        }}
        providers={options || []}
      />
    </FadeIn>
  )
}

export default EventFilterOptionProvider
