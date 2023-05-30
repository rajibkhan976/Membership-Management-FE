import FilterBarLabelItem from '@jg/common/comps/filter/FilterBarLabelItem'
import useEventStore from '@jg/widgets/Events/store/useEventStore'
import useNavigateWithArgs from '../../hooks/useNavigateWithArgs'

const ProviderLabel = () => {
  const { currentArgs, setCurrentArgs } = useNavigateWithArgs()
  const filterBarData = useEventStore((state) => state.filterBarData)
  const providers = useEventStore((state) => state.searchRequestArg.provider)
  const provider = providers ? providers[0] : 'all'
  let providerName: JSX.Element = <></>
  switch (provider) {
    case 'all':
      providerName = <>All organisers</>
      break
    case 'ngb': // depricated
      providerName = <>NGB</>
      break
    /*case 'club':
      providerName = 'All club organisers'
      break
    case 'region':
      providerName = 'All regional organisers'
      break
    case 'sub-region':
      providerName = 'All sub regional organisers'
      break*/
    default:
      // providerName = filterBarData?.Clubs.find((e) => e.DocId.toString() === provider)?.Name || '...'
      if (providers && providers.length) {
        const displaybleOrgNames = []
        const max = 2
        let i = 0
        const len = providers.length > max ? max : providers.length
        while (i < len) {
          //console.log(filterBarData?.Clubs.find((e) => e.DocId.toString() === providers[i])?.Name)
          displaybleOrgNames.push(filterBarData?.Clubs.find((e) => e.DocId.toString() === providers[i])?.Name)
          i++
        }
        const restCount = providers.length - displaybleOrgNames.length
        providerName = (
          <>
            {displaybleOrgNames.join(', ')}
            {!!restCount && ','}
            <span className="text-jg-green-500">{restCount ? ` ${restCount} more organisers` : ''}</span>
          </>
        )
      }

      break
  }
  return (
    <FilterBarLabelItem
      isActive={provider != 'all'}
      name="provider"
      filterValueDispplayText={providerName}
      reset={() => {
        setCurrentArgs({ ...currentArgs, provider: ['all'] })
      }}
    />
  )
}
export default ProviderLabel
