import { JGListbox } from '@comps/uiComps'
import JGListboxItem from '@comps/uiComps/JGListbox/JGListboxItem'

type CategoryType = { name: string; value: string | number }
const CategoryList = ({
  categories,
  onChange,
  selected,
}: {
  categories: CategoryType[]
  onChange: (v: CategoryType) => void
  selected?: string
}) => {
  return (
    <JGListbox
      onChange={onChange}
      size="md"
      type={'input'}
      selectedValue={selected || 'all'}
      className={'min-w-[216px] my-1'}
    >
      {categories.map(({ name, value }, index) => {
        return <JGListboxItem key={index} name={name} value={value} />
      })}
    </JGListbox>
  )
}

export default CategoryList
