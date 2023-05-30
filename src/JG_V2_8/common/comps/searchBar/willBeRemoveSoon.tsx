import { FieldBaseProps } from '@comps/uiComps/_base/types/CompBaseProps'
// import { CompBaseProps, FieldBaseProps } from '../../../../comps/uiComps/_base/types/CompBaseProps'
import { LocationMarkerIcon } from '@heroicons/react/solid'

export type PostcodeFieldProps = FieldBaseProps & {
  placeholder?: string
}

export default function PostcodeField({ placeholder = 'City or Zip Code' }: PostcodeFieldProps) {
  return (
    <div className="flex justify-between m-1">
      <input
        type="text"
        id="pc"
        placeholder={placeholder}
        name="pc"
        className="bg-white font-medium outline-none text-sm font-medium text-gray-700 w-full h-[24px]"
      />

      <LocationMarkerIcon className="text-jg-grey-500 w-4 m-1" />
    </div>
  )
}
