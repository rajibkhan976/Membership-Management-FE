import { UiCompClassType } from '@jg/common/dataAPIs/entityExtensions/schemas/EntityExtSchema'

export default ({ $fallbackFieldItemClass }: { $fallbackFieldItemClass: UiCompClassType }) => {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h3 className="text-base font-semibold leading-6 text-gray-900">Error!</h3>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">
        Unable to render the item : <span className="font-bold">{$fallbackFieldItemClass}</span>
      </p>
    </div>
  )
}
