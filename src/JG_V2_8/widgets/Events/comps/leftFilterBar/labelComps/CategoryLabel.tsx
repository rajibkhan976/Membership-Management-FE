import FilterBarLabelItem from '@jg/common/comps/filter/FilterBarLabelItem'
import useEventStore from '@jg/widgets/Events/store/useEventStore'
import useNavigateWithArgs from '../../hooks/useNavigateWithArgs'

const CategoryLabel = () => {
  const { currentArgs, setCurrentArgs } = useNavigateWithArgs()
  const displayItems: string[] = []
  const categories = useEventStore((state) => state.filterBarData)?.Categories || []
  const categoryQs = useEventStore((state) => state.searchRequestArg.category) || []
  if (categoryQs[0] === 'all') {
    displayItems.push('All categories')
  } else {
    for (let k = 0; k < categories?.length; k++) {
      const ctg = categories[k]
      for (let i = 0; i < categoryQs.length; i++) {
        const qsCtg = categoryQs[i]
        const parts = qsCtg.split('$sub$')
        if (parts[0] === ctg.Name) {
          displayItems.push(ctg.DisplayName)
          if (parts.length > 1) {
            const qsSubs = parts[1].split('$$')
            ctg.SubCategories.forEach((sub) => {
              if (qsSubs.indexOf(sub.Name) > -1) {
                displayItems.push(sub.Name)
              }
            })
          }
          break
        }
      }
    }
  }
  let displayText = <></>
  const max = 2
  if (displayItems.length) {
    const len = displayItems.length > max ? max : displayItems.length
    const restCount = displayItems.length - len
    displayText = (
      <>
        {displayItems.slice(0, len).join(', ')}
        <span className="text-jg-grey-900">{restCount ? `+${restCount} more categories` : ''}</span>
      </>
    )
  }
  return (
    <FilterBarLabelItem
      isActive={categoryQs[0] != 'all'}
      name="category"
      filterValueDispplayText={displayText}
      reset={() => {
        setCurrentArgs({ ...currentArgs, category: ['all'] })
      }}
    />
  )

  //return displayText
}
export default CategoryLabel
