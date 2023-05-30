import { useBookATicketStoreContext } from '../providers/BookATicketProvider'

const InvalidSummary = ({ invalidCount, formCount }: { invalidCount: number; formCount: number }) => {
  const { setBookingformScreen } = useBookATicketStoreContext((state) => ({
    setBookingformScreen: state.setBookingformScreen,
  }))
  return (
    <span className="inline-flex gap-1 items-center ml-1">
      <div className="inline-flex items-center border-b border-jg-red-400 p-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.9633 4.33337H9.62996V3.00004H2.9633V4.33337ZM6.0833 12.3334H1.62996C1.2633 12.3334 0.949964 12.2 0.689964 11.94C0.429964 11.68 0.296631 11.3667 0.296631 11V1.66671C0.296631 1.30004 0.429964 0.986707 0.689964 0.726707C0.949964 0.466707 1.2633 0.333374 1.62996 0.333374H10.9633C11.33 0.333374 11.6433 0.466707 11.9033 0.726707C12.1633 0.986707 12.2966 1.30004 12.2966 1.66671V6.13337C11.9766 5.98004 11.65 5.86004 11.3233 5.78671C10.9966 5.70671 10.6566 5.66671 10.2966 5.66671C10.1766 5.66671 10.0633 5.66671 9.95663 5.67337C9.84996 5.67337 9.7433 5.69337 9.62996 5.71337V5.66671H2.9633V7.00004H7.0433C6.8433 7.18671 6.6633 7.39337 6.5033 7.62004C6.3433 7.84004 6.2033 8.08004 6.07663 8.33337H2.95663V9.66671H5.66996C5.64996 9.78004 5.63663 9.88671 5.62996 9.99337C5.62996 10.1 5.6233 10.2134 5.6233 10.3334C5.6233 10.7 5.65663 11.04 5.7233 11.36C5.78996 11.6734 5.90996 12 6.07663 12.3334H6.0833ZM12.7233 7.97337C12.0766 7.32671 11.29 7.00004 10.37 7.00004C9.44996 7.00004 8.65663 7.32671 8.00996 7.97337C7.35663 8.62671 7.03663 9.41337 7.03663 10.3334C7.03663 11.2534 7.35663 12.04 8.00996 12.6934C8.65663 13.34 9.4433 13.6667 10.37 13.6667C11.2966 13.6667 12.0766 13.34 12.7233 12.6934C13.37 12.0467 13.7033 11.2534 13.7033 10.3334C13.7033 9.41337 13.3766 8.62671 12.7233 7.97337ZM12.1833 11.54L11.5766 12.1467L10.3766 10.9334L9.1633 12.1467L8.55663 11.54L9.76996 10.3334L8.55663 9.12004L9.1633 8.52004L10.3766 9.72004L11.5766 8.52004L12.1833 9.12004L10.9833 10.3334L12.1833 11.54Z"
            fill="#EF5350"
          />
        </svg>
        <span className="ml-1 text-inputSizeMd font-medium text-jg-metal-900">{`${invalidCount} of ${formCount} form${
          formCount > 1 ? 's' : ''
        } not completed yet.`}</span>
      </div>
      <p
        onClick={() => setBookingformScreen?.(true)}
        className="block md:jg-hidden font-medium text-sm leading-4 text-jg-green-500 cursor-pointer border-b border-transparent"
      >
        Fill the forms <span className="text-lg font-normal">»</span>
      </p>
    </span>
  )
}
export default InvalidSummary
