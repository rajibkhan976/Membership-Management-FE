import { addressInfo } from '@jg/common/types'

export default ({ Address1, Address2, Address3, Town, County, Postcode, Country }: any): addressInfo => ({
  address1: Address1,
  address2: Address2,
  address3: Address3,
  town: Town,
  county: County,
  postCode: Postcode,
  country: Country,
})
