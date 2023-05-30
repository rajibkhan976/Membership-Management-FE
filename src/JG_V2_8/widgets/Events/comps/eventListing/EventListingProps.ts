import { CompBaseProps } from '@comps/uiComps'
import { EventListingType } from '../../store/useEventStore'
// import { EventInfo } from "../../types/EventInfo";

export type EventListingProps = CompBaseProps & {
  imageAlign?: 'top' | 'left'
  itemAs?: React.ElementType<any>
  view: EventListingType
}
