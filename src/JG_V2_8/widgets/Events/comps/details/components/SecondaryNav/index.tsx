import { Button } from '@comps/uiComps'
import { TicketIcon } from '@heroicons/react/outline'
import { ArrowSmLeftIcon, TagIcon } from '@heroicons/react/solid'
import { IsBlended } from '@jg/_core/Authorization'
import DateTimeInfo from '@jg/common/comps/labels/DateTimeInfo/DateTimeInfo'
import { EventPriceSettings } from '@jg/common/types'
import { DateTimeInfo as DateTimeInfoType } from '@jg/common/types/common/DateTimeInfo'
import { useRouter } from '@jg/hooks'
import useStickyNav from '@jg/hooks/useStickyNav'
import { Currency } from '@jg/utils'
import { useEventConfig } from '@jg/widgets/Events/EventWidget'
import useEventStore from '@jg/widgets/Events/store/useEventStore'
import { useWidgetContext } from 'jg-widget'
import { useRef } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

type SecondaryNavProps = {
  isBooked?: boolean
  eventName?: string
  startingFrom?: DateTimeInfoType
  priceOptions?: EventPriceSettings
}

function SecondaryNav(props: SecondaryNavProps) {
  const ref = useRef<HTMLDivElement>(null)
  const top = IsBlended() ? 0 : 52
  const isSticky = useStickyNav(ref, top)
  const { basePath } = useWidgetContext()
  const navigate = useNavigate()
  // const location = useLocation()
  // const { navigate,  } = useRouter()

  const { eventName, startingFrom, priceOptions, isBooked } = props
  const currencySymbol = Currency.getSymbol(priceOptions?.currency || '')
  const priceFigure = priceOptions?.displayPrice || ''

  const priceCalculate = (price: string) => {
    if (priceFigure?.toLowerCase() === 'free') {
      price = priceFigure
      return price
    } else if (priceFigure?.includes('-') === true) {
      price = priceFigure
        ?.split('-')
        .map((item) => `${currencySymbol}${Number(item).toFixed(2)}`)
        .join(' - ')

      return price
    } else if (priceFigure === '' || priceFigure === null) {
      return priceFigure
    } else {
      price = `${currencySymbol}${Number(priceFigure).toFixed(2)}`
      return price
    }
  }
  const priceLabel = priceCalculate(priceFigure)
  const { isEvent } = useEventConfig()
  const prevNavOfDetailsPage = useEventStore((state) => state.prevNavOfDetailsPage)
  return (
    <div
      style={{ top: top + 'px' }}
      ref={ref}
      className={`flex justify-between bg-white sticky  z-[1100] transition-all flex-col md:flex-row ${
        isSticky ? 'shadow-md' : ''
      }`}
    >
      {/* Hidden layer. Shows after stickyness */}
      <div
        style={{ top: top + 'px' }}
        className={`jg-hidden md:fixed h-[84px] bg-white  left-0 right-0 -z-10 shadow-sm ${
          !isSticky ? 'jg-hidden md:hidden' : 'md:flex'
        }`}
      />
      {/* Actual content */}
      <div className="flex justify-start md:justify-center items-center md:space-x-2 py-2 px-4 md:py-3.5 md:px-5 border-b border-solid border-jg-metal-50 md:border-0 md:min-h-[76px]">
        <ArrowSmLeftIcon
          className="w-7 text-jg-metal-900 cursor-pointer mr-3"
          onClick={() => {
            //console.log(prevNavOfDetailsPage)
            // return
            const prevNavOfDetailsPage = localStorage.getItem('prevNavOfDetailsPage')
            if (prevNavOfDetailsPage === null) navigate(`${basePath}`)
            else navigate(prevNavOfDetailsPage)
          }}
        />
        <div>
          <h2 className="text-[16px] font-semibold leading-5 text-jg-metal-900 mb-1 truncate w-full max-w-[280px] sm:max-w-[320px] md:max-w-[480px] lg:max-w-[500px] xl:max-w-[800px] ">
            {eventName || '(No Name)'}
          </h2>
          {isEvent && (
            <DateTimeInfo dateTimeInfo={startingFrom} className="text-[13px] leading-4 text-jg-metal-300 uppercase" />
          )}
        </div>
      </div>
      <div className="flex gap-4 justify-between md:items-center py-2 px-4 md:py-3.5 md:px-5  border-b border-solid border-jg-metal-50 md:border-0">
        <div className="flex gap-1 justify-center items-center">
          {!priceLabel || priceLabel === '' ? (
            <></>
          ) : (
            <>
              {/* <TagIcon /> */}
              <TicketIcon className="w-5 h-5 text-jg-metal-900" />
              <span className="text-jg-metal-900 text-globalTextSizeLg font-medium ">Price {priceLabel}</span>
            </>
          )}
        </div>
        {!isBooked && (
          <Button
            btnColor="primary"
            fillType="outline"
            text={isEvent && !isBooked ? 'Find Tickets' : 'View Items'}
            onClick={() => {
              const el = document?.getElementById('buy-tickets') as HTMLDivElement
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
          />
        )}
      </div>
    </div>
  )
}

export default SecondaryNav

// const priceCalculate = (priceOptions?: EventPriceSettings) => {
//   const currencySymbol = Currency.getSymbol(priceOptions?.currency || '')
//   const priceFigure =
//     priceOptions?.min === priceOptions?.max
//       ? priceOptions?.min === 0
//         ? 'Free'
//         : `${currencySymbol}${Number(priceOptions?.min).toFixed(2)}`
//       : `${currencySymbol}${Number(priceOptions?.min).toFixed(2)}-${currencySymbol}${Number(
//           priceOptions?.max
//         ).toFixed(2)}`

//   return priceFigure
// }
// Copied from EventInfoCard; AUTHOR: Mehedi Hasan
// const getPriceFigure = (priceOptions?: EventPriceSettings) => {
//   const currencySymbol = Currency.getSymbol(priceOptions?.currency || '')
//   const priceFigure =
//     priceOptions?.min === priceOptions?.max
//       ? priceOptions?.min === 0
//         ? 'Free'
//         : `${currencySymbol}${Number(priceOptions?.min).toFixed(2)}`
//       : `${currencySymbol}${Number(priceOptions?.min).toFixed(2)}-${currencySymbol}${Number(priceOptions?.max).toFixed(
//           2
//         )}`

//   return priceFigure
// }
