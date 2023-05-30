import { ProductType, dateTimeInfo, entityInfo } from '@jg/common/types'
import { TicketPriceSettings } from './TicketPriceSettings'

export type DataCaptureItem = {
  Config: string
  Id: number
  ProductId: number
  Sequence: 1
  Type: 'form' | 'product' | 'declaration' | 'sectionHeader'
}
export type TicketInfo = {
  productCategory?: string
  quantity: number
  availableQuantity: number
  minPurchase: number
  maxPurchase: number
  productType: number
  docId: number
  currency?: string
  description?: string
  name?: string
  unitPrice?: number
  priceSettings?: TicketPriceSettings
  imgSrc?: string
  ownerEntity?: entityInfo
  starts?: dateTimeInfo
  ends?: dateTimeInfo
  availability?: boolean
  awaitable?: boolean
  noOfBooking?: number
  dataCaptureItems?: DataCaptureItem[]
  isInstallmentEnabled?: 0 | 1
  installmentDetails?: ProductType[]
  displayPrice?: string
}
