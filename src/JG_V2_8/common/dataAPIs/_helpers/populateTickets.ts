import { ProductType, TicketInfo } from '@jg/common/types'
import { DateTimeInfo } from '@jg/common/types/common/DateTimeInfo'

export default (rawData: any): TicketInfo => {
  return {
    productCategory: rawData.ProductCategory,
    quantity: rawData.AvailableQuantity,
    availableQuantity: rawData.AvailableQuantity,
    productType: rawData.ProductType,
    minPurchase: rawData.MinPurchasableQuantity,
    maxPurchase: rawData.MaxPurchasableQuantity,
    docId: rawData.DocId,
    currency: rawData.AlternateDisplayCurrency,
    description: rawData.Description,
    name: rawData.Name,
    unitPrice: rawData.Unitprice,
    priceSettings: rawData.PriceSettings,
    imgSrc: rawData.ImageSrc,
    ownerEntity: rawData.EntityInfo,
    availability: rawData.ProductAvailability === 1,
    starts: populateTicketEnds(rawData.Starts),
    ends: populateTicketEnds(rawData.Ends),
    awaitable: rawData.ProductAwaitable,
    noOfBooking: rawData.NoOfBooking,
    isInstallmentEnabled: rawData.IsInstallmentEnabled,
    dataCaptureItems: rawData.DataCaptureItems || [],
    displayPrice: rawData.DisplayPrice,
    installmentDetails: rawData.IstallmentDetails //IstallmentDetails
      ? (rawData.IstallmentDetails as ProductType[])
      : [],
  }
}

const populateTicketEnds = (date: {
  Date: string
  Time: string
  TimeZone: string
  TimeZoneId: number
}): DateTimeInfo => {
  return {
    date: date.Date,
    time: date.Time,
    timezone: date.TimeZone,
    timezoneId: date.TimeZoneId,
  }
}
