import { ViewBaseProps } from './ViewBaseProps'
import { CompBaseProps } from '@comps/uiComps'
import { ReactElement } from 'react'

type CalendarItemProps = CompBaseProps &
  ViewBaseProps & {
    event?: any
    view?: string
    children?: ReactElement
  }

const CalendarItem = (props: CalendarItemProps) => {
  const { children, className, view, event, onItemMouseEnter, onItemMouseLeave, onItemClick, onItemOutSideClick } =
    props
  return (
    <>
      {children ? (
        children
      ) : (
        <div
          className={className && className}
          onClick={(e) => {
            onItemOutSideClick && onItemOutSideClick(e)
            setTimeout(() => {
              onItemClick && onItemClick(e, event?.id)
            }, 200)
          }}
          style={view && view !== 'list' ? { backgroundColor: `${event?.label || '#4CAF4F'}` } : {}}
          onMouseEnter={(e) => onItemMouseEnter && onItemMouseEnter(e, event?.id)}
          onMouseLeave={(e) => onItemMouseLeave && onItemMouseLeave(e, event?.id)}
        >
          <span className="truncate">{event?.name}</span>
        </div>
      )}
    </>
  )
}

export default CalendarItem
