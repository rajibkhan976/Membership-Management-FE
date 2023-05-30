import { SearchField } from '@jg/common/comps'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'
import useEventStore from '@jg/widgets/Events/store/useEventStore'
import { useEffect, useMemo, useRef, useState } from 'react'
import useNavigateWithArgs from '../../hooks/useNavigateWithArgs'
import SingleAccordionWithToggle, { SingleAccordionItemProps } from './SingleAccordionWithToggle'
import { useEventConfig } from '@jg/widgets/Events/EventWidget'

const OrderBy = {
  ngb: 0,
  region: 1,
  'sub region': 2,
  club: 3,
}

const OrganiserOptionScreen = () => {
  const filterBarData = useEventStore((state) => state.filterBarData)

  const { getArgsFromUrl, setCurrentArgs } = useNavigateWithArgs()
  const organizationsFromUrl = getArgsFromUrl().provider || ['all']

  const { isPublic } = useEventConfig()

  // Region and sub Region could be called as different name
  const dynamicAlternateTitle = useRef({
    region: '',
    ['sub region']: '',
  })

  // Process the data for local state and component
  const organizations = useMemo(() => {
    return filterBarData?.Clubs.map((club) => {
      const clubType = club.ClubType?.toLowerCase()

      // Check to see if region and sub region has different name
      if (clubType === 'region' && !dynamicAlternateTitle.current.region)
        dynamicAlternateTitle.current.region = club.ClubInternalType
      if (clubType === 'sub region' && !dynamicAlternateTitle.current['sub region'])
        dynamicAlternateTitle.current['sub region'] = club.ClubInternalType

      return {
        id: club.DocId,
        text: club.Name,
        count: club.EventCount,
        selected: organizationsFromUrl[0] === 'all' ? true : organizationsFromUrl?.includes(`${club.DocId}`),
        subText: club.Address,
        category: club.IsMyOrganization
          ? 'My Organisations'
          : clubType === 'ngb'
          ? 'NGB'
          : clubType === 'region'
          ? 'region'
          : clubType === 'sub region'
          ? 'sub region'
          : 'Clubs',
        orderBy: OrderBy[clubType as 'ngb'],
      } as SingleAccordionItemProps & {
        category: 'My Organisations' | 'NGB' | 'region' | 'sub region' | 'Clubs'
        orderBy: number
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBarData?.Clubs])

  const [organiserState, setOrganiserState] = useState(organizations || [])

  const searchDebounce = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const selectedOrganizationId = organiserState.filter((org) => org.selected).map((org) => `${org.id}`)
    setCurrentArgs((prev) => ({
      ...prev,
      provider: [0, organizations?.length].includes(selectedOrganizationId.length) ? ['all'] : selectedOrganizationId,
    }))

    return () => clearTimeout(searchDebounce.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organiserState, organizations])

  return (
    <div className="divide-y divide-jg-metal-50 overflow-hidden flex flex-col">
      <div className="flex h-5 items-center mx-4 my-2 font-medium text-globalTextSizeSm text-jg-metal-500">
        <input
          type="checkbox"
          id={'all-option-organizations'}
          checked={organiserState.every((item) => item.selected)}
          className="h-4 w-4"
          onChange={(e) => setOrganiserState(organiserState.map((item) => ({ ...item, selected: e.target.checked })))}
        />
        <label className="ml-2 flex-grow">All</label>
        <span>({organiserState.reduce((acc, cur) => acc + (cur?.count || 0), 0)})</span>
      </div>

      <SearchField
        placeholder="Search..."
        className="pl-2"
        onChange={(value) => {
          if (searchDebounce.current) {
            clearTimeout(searchDebounce.current)
          }
          searchDebounce.current = setTimeout(() => {
            const result = (organizations || []).filter((item) =>
              (['text', 'subText'] as const).some((el) => item[el]?.toLowerCase().includes(value.toLowerCase()))
            )
            setOrganiserState(result)
          }, 500)
        }}
      />

      <FancyScroll className="flex-grow">
        {['My Organisations', 'region', 'sub region', 'Clubs'].map((section) => {
          let title = dynamicAlternateTitle.current[section as 'region'] || section
          const filteredOption = organiserState.filter((org) => org.category === section)
          // Sort my organizations by order
          const options =
            section === 'My Organisations' ? filteredOption.sort((f, s) => f.orderBy - s.orderBy) : filteredOption

          if (options.length === 0) return <></>

          title = isPublic && title === 'My Organisations' ? 'Organisations' : title
          return (
            <SingleAccordionWithToggle
              key={section}
              options={options}
              title={title}
              opened={true}
              onChange={(clubs) => {
                const copyOfItems = [...organiserState]
                clubs.forEach((club) =>
                  organiserState.forEach((item) => (item.id === club.id ? (item.selected = club.selected) : ''))
                )
                setOrganiserState(copyOfItems)
              }}
            />
          )
        })}
      </FancyScroll>
    </div>
  )
}

export default OrganiserOptionScreen
