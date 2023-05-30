import { TextField } from '@comps/uiComps'
import { HTMLAttributes, useState } from 'react'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'
import EventDistanceOptionPicker from '../EventDistanceOptionPicker'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import IndividaulFilterOption from './FilterIndividualOption'

const EventFilterOptionDistance = () => {
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  const { sysDistanceUnit } = useEventSettingsContext()

  const curDistance = getArgsFromUrl().distance || ''
  const availableOptions = ['all', ...distanceFilterOptions].map((d) => d)
  const [active, setActive] = useState(availableOptions.includes(curDistance) ? curDistance : 'custom')

  return (
    <div className="divide-y divide-jg-metal-50">
      {/* <EventDistanceOptionPicker
        value={getArgsFromUrl().distance}
        onChange={(value) => {
          setCurrentArgs({ ...currentArgs, ...{ distance: value } })
        }}
      /> */}
      {
        <>
          <IndividaulFilterOption
            title="Any Distance"
            active={active === 'all'}
            onClick={() => {
              setActive('all')
              setCurrentArgs({ ...currentArgs, distance: 'all' })
            }}
          />
          <IndividaulFilterOption
            title={
              <>
                <h3 className="text-sm leading-4 font-medium">Specific distance</h3>
                <InputIcon className="w-4 h-4" />
              </>
            }
            active={active === 'custom'}
            onClick={() => {
              setActive('custom')
            }}
          />
          {active === 'custom' && (
            <IndividaulFilterOption
              title={
                <TextField
                  type="number"
                  hideLabel
                  className={'!mb-0'}
                  placeholder={`Enter a distance in ${sysDistanceUnit}`}
                  initialValue={distanceFilterOptions.includes(curDistance) ? '' : curDistance}
                  // @ts-ignore prettier-ignore
                  onBlur={(e) => {
                    e.target.value && setCurrentArgs({ ...currentArgs, distance: e.target.value })
                  }}
                  onKeyUp={(e: any) => {
                    if (e.code.toLowerCase().includes('enter') && e.target.value) {
                      setCurrentArgs({ ...currentArgs, distance: e.target.value })
                    }
                  }}
                  onKeyDown={(evt: any) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
                  min={0}
                />
              }
            />
          )}
          {distanceFilterOptions.map((d) => {
            return (
              <IndividaulFilterOption
                key={d}
                title={`Within ${d} ${sysDistanceUnit.toLowerCase()}s`}
                active={active === d}
                onClick={() => {
                  setActive(d)
                  setCurrentArgs({ ...currentArgs, distance: d })
                }}
              />
            )
          })}
        </>
      }
    </div>
  )
}
export default EventFilterOptionDistance

const distanceFilterOptions = ['5', '10', '50', '100', '200', '500', '1000']

const InputIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.3335 3.66671H13.6668V10.3334H10.3335V11.6667C10.3335 11.8435 10.4037 12.0131 10.5288 12.1381C10.6538 12.2631 10.8234 12.3334 11.0002 12.3334H12.3335V13.6667H10.6668C10.3002 13.6667 9.66683 13.3667 9.66683 13C9.66683 13.3667 9.0335 13.6667 8.66683 13.6667H7.00016V12.3334H8.3335C8.51031 12.3334 8.67988 12.2631 8.8049 12.1381C8.92992 12.0131 9.00016 11.8435 9.00016 11.6667V2.33337C9.00016 2.15656 8.92992 1.98699 8.8049 1.86197C8.67988 1.73695 8.51031 1.66671 8.3335 1.66671H7.00016V0.333374H8.66683C9.0335 0.333374 9.66683 0.633374 9.66683 1.00004C9.66683 0.633374 10.3002 0.333374 10.6668 0.333374H12.3335V1.66671H11.0002C10.8234 1.66671 10.6538 1.73695 10.5288 1.86197C10.4037 1.98699 10.3335 2.15656 10.3335 2.33337V3.66671ZM0.333496 3.66671H7.66683V5.00004H1.66683V9.00004H7.66683V10.3334H0.333496V3.66671ZM12.3335 9.00004V5.00004H10.3335V9.00004H12.3335Z"
        fill="currentColor"
      />
    </svg>
  )
}
