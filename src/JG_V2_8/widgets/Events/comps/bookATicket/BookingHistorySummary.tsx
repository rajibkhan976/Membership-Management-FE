import useEventStore from '../../store/useEventStore'

const BookingHistorySummary = ({ entityId, ticketDocId }: { entityId: number; ticketDocId: number }) => {
  const myBookingsDetails = useEventStore((state) => state.myBookingsDetails)
  console.log(myBookingsDetails)
  let count = 0
  myBookingsDetails.forEach((e) => {
    e.rows.forEach((b) => {
      if (b.memberId === entityId && Number(b.productDocId) === ticketDocId) {
        count++
      }
    })
  })

  //memberId, productDocId
  return (
    <>
      {count > 0 && (
        <span className="inline-flex h-6 items-center ml-1 text-jg-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
            <path
              d="M13.6663 4.6665V1.99984C13.6663 1.25984 13.0663 0.666504 12.333 0.666504H1.66634C0.933008 0.666504 0.333008 1.25984 0.333008 1.99984V4.6665C1.07301 4.6665 1.66634 5.2665 1.66634 5.99984C1.66634 6.73317 1.07301 7.33317 0.333008 7.33317V9.99984C0.333008 10.7332 0.933008 11.3332 1.66634 11.3332H12.333C13.0663 11.3332 13.6663 10.7332 13.6663 9.99984V7.33317C12.933 7.33317 12.333 6.73317 12.333 5.99984C12.333 5.2665 12.933 4.6665 13.6663 4.6665ZM12.333 3.69317C11.5397 4.15317 10.9997 5.01984 10.9997 5.99984C10.9997 6.97984 11.5397 7.8465 12.333 8.3065V9.99984H1.66634V8.3065C2.45967 7.8465 2.99967 6.97984 2.99967 5.99984C2.99967 4.99984 2.46634 4.15317 1.66634 3.69317V1.99984H12.333V3.69317ZM6.33301 7.99984H7.66634V9.33317H6.33301M6.33301 5.33317H7.66634V6.6665H6.33301M6.33301 2.6665H7.66634V3.99984H6.33301V2.6665Z"
              fill="#42A4F5"
            />
          </svg>
          <span className="text-jg-blue-400 ml-1 text-inputSizeMd">{`${count} ticket${
            count > 1 ? 's' : ''
          } already booked`}</span>
        </span>
      )}
    </>
  )
}

export default BookingHistorySummary
