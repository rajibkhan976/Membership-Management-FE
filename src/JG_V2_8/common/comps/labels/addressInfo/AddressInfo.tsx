import { addressInfo } from '@jg/common/types'
import { AddressInfoProps } from './AddressInfoProps'

function AddressInfo(props: AddressInfoProps) {
  const defaults: addressInfo = {
    address1: '',
    address2: '',
    address3: '',
    town: '',
    postCode: '',
    county: '',
    country: '',
  }
  const { className, address = defaults, format } = props
  return (
    <div className={className}>
      {/* 1) Add ', ' after every address line 2) join 3) remove last ', ' from joined string */}
      {format
        ? format(address)
        : Object.keys(address)
            .map((key) => withComma(address[key as keyof addressInfo]))
            .join('')
            .slice(0, -2)}
      {/* {address.address1}, {address.address2}, {address.town}, {address.postCode}
      , {address.county}, {address.country} //.slice(0, -2) */}
    </div>
  )
}
export default AddressInfo

const withComma = (str?: string) => {
  if (str && str.length > 0) {
    return `${str}, `
  }
  return ''
}
