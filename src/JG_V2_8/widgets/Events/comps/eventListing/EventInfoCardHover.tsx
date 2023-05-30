import { CompBaseProps } from '@comps/uiComps'
import classNames from 'classnames'
import { useFilterResultMapContext } from '../../providers/FilterResultMapProvider'

const EventInfoCardHover = ({ children, className, id }: CompBaseProps & { id: string }) => {
  const { setEventInfoCardSelected, changeMapMarker } = useFilterResultMapContext()

  return (
    <div
      onMouseEnter={() => {
        setEventInfoCardSelected(id, true)
        changeMapMarker?.(id, { icon: 'marker-darkblue', hovered: 1 })
      }}
      onMouseLeave={() => {
        setEventInfoCardSelected(id, false)
        changeMapMarker?.(id, { icon: 'marker-red', hovered: 0 })
      }}
      id={`event-info-card-${id}`}
      className={classNames('', className)}
    >
      {children}
    </div>
  )
}
export default EventInfoCardHover
