import { memo } from 'react'
import { useEventConfig } from '../../EventWidget'
import { CategoryCardProps } from './CategoryCardProps'

function CategoryCard(props: CategoryCardProps) {
  const { eventCategory, subItemCount } = props
  const { isEvent } = useEventConfig()
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-md bg-gradient-to-t from-jg-grey-900 to-jg-grey-600">
        <div className="transition-all aspect-w-9 aspect-h-11 delay-150 duration-500 ease-in-out hover:scale-125">
          <img
            className="w-full flex-shrink-0 object-cover"
            src={eventCategory?.imgSrc}
            alt={eventCategory?.displayName || isEvent ? 'Events' : 'Items'}
          />
          <div className="bg-black opacity-[0.3] absolute left-0 right-0 top-0 bottom-0"></div>
        </div>
      </div>
      <div className="absolute left-4 bottom-4 right-4 text-white">
        <h3 className="font-semibold leading-5 mb-1">{eventCategory?.displayName}</h3>
        <span className="text-[13px] leading-4">
          {subItemCount} {isEvent ? 'Events' : 'Items'}
        </span>
      </div>
    </div>
  )
}
export default memo(CategoryCard)
