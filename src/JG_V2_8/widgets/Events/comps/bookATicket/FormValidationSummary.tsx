import { useEntityExtGenericDataCaptureContext } from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
import InvalidSummary from '../InvalidSummary'

const FormValidationSummary = ({ entityId, onClick }: { entityId: number; onClick: (index: number) => void }) => {
  const { invalidMsgSummary } = useEntityExtGenericDataCaptureContext((state) => ({
    invalidMsgSummary: state.invalidMsgSummary,
  }))

  const forms = invalidMsgSummary.filter((e) => e.entityId === entityId)
  const formCount = forms.length
  const invalidItems = forms.filter((e) => e.summary[0].length > 0)
  const invalidCount = invalidItems.length
  console.log(invalidItems, invalidMsgSummary)

  return (
    <>
      {invalidCount > 0 && (
        <a
          className="cursor-pointer"
          onClick={() => {
            onClick(invalidItems[0].index)
          }}
        >
          <InvalidSummary invalidCount={invalidCount} formCount={formCount} />
        </a>
      )}
    </>
  )
}
export default FormValidationSummary
