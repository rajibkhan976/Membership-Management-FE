import Toggle from '@comps/uiComps/Toggle/Toggle'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import EventFilterBarField from './EventFilterBarField'

const EventFilterOptionInstallment = () => {
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  return (
    <EventFilterBarField label="Installment Available">
      <div className="py-1.5 ">
        <Toggle
          value={getArgsFromUrl().installment}
          onChange={(value) => {
            setCurrentArgs({ ...currentArgs, ...{ installment: value } })
          }}
        />
      </div>
    </EventFilterBarField>
  )
}
export default EventFilterOptionInstallment
