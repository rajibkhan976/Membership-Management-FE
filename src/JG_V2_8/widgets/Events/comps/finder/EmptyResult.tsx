import { XCircleIcon } from '@heroicons/react/outline'

const EmptyResult = () => {
  return (
    <div className="text-center py-3">
      <XCircleIcon className="mx-auto h-12 w-12 text-jg-grey-300" />
      <h2 className="mt-2 text-lg font-medium text-jg-grey-900">No results found.</h2>
      <p className="mt-1 text-sm text-jg-grey-600">
        Sorry, no events found with this filter criteria. Please try again with different criteria.
      </p>
    </div>
  )
}
export default EmptyResult
