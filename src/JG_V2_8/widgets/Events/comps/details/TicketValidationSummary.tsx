import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'
import InvalidSummary from '../InvalidSummary'

const TicketValidationSummary = ({ ticketDocId }: { ticketDocId: number }) => {
  const { invalidSummary } = useEventTicketListStoreContext((state) => ({
    invalidSummary: state.invalidSummary,
  }))
  const item = invalidSummary.find((e) => e.ticketDocId === ticketDocId)
  console.log('items', ticketDocId, item, invalidSummary)

  let formCount = 0

  let invalidCount = 0
  if (item) {
    formCount = item.summary.length
    item.summary.forEach((e) => {
      if (e.summary[0].length > 0) invalidCount++
    })
  }

  return <>{invalidCount > 0 && <InvalidSummary formCount={formCount} invalidCount={invalidCount} />}</>
}
export default TicketValidationSummary
