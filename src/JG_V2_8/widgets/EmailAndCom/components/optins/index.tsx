import useClubSwitcherStore, { ClubSwitcherStore } from '@jg/widgets/ClubSwitcher/store/useClubSwitcherStore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useOptin } from '../../store/useOptin'
import type { SendEmailInitialValue } from '../../types'
import OptinsSelect from './optinSelect'

type OptinsComponentsProps = {
  setFieldValue: any
  values: SendEmailInitialValue
}

const OptinsComponents = ({ setFieldValue, values }: OptinsComponentsProps) => {
  const { optins, fetch: getOptins } = useOptin()
  const { clubDocId } = useParams()
  const { clubs } = useClubSwitcherStore((state: ClubSwitcherStore) => state)
  const [enableOptinCondition, setEnableOptinCondition] = useState<boolean>(values.OptIns.length > 0 ? true : false)

  useEffect(() => {
    getOptins('NGB')
  }, [])
  const getMembers: any = (members: any) => {
    let children: any = []
    const flattenMembers = members.map((m: any) => {
      if (m.OptIns && m.OptIns.length) {
        children = [...children, ...m.OptIns]
      }
      return children
    })
    return children
  }
  return (
    <>
      <div className="p-4">
        <p className="text-[#607D8B] text-[13px]">This email will currently be sent to everyone in the segment.</p>
        <div className="border-b py-1">
          <div className="flex py-3 items-center justify-between">
            <div className="text-[13px] text-[#455A64] font-medium leading-4">Enable and add opt-in conditions</div>
            <div className="flex">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableOptinCondition}
                  onChange={(e) => {
                    setEnableOptinCondition(e.target.checked)
                    !e.target.checked && setFieldValue('OptIns', [])
                  }}
                  className="sr-only peer"
                />
                <div className="relative w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[50%] after:translate-y-[-50%] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-jg-green-600 peer-checked:after:left-[calc(100%-14px)] after:shadow-sm"></div>
              </label>
            </div>
          </div>
        </div>
        {enableOptinCondition && (
          <>
            <div className="border-b py-4">
              {optins && optins.Groups && optins.Groups.length > 0 && (
                <OptinsSelect
                  isInclude={true}
                  values={values}
                  setFieldValue={setFieldValue}
                  optins={getMembers(optins.Groups)}
                />
              )}
            </div>

            <div className="py-4">
              {optins && optins.Groups && optins.Groups.length > 0 && (
                <OptinsSelect
                  isInclude={false}
                  values={values}
                  setFieldValue={setFieldValue}
                  optins={getMembers(optins.Groups)}
                />
              )}
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="border-t border-b py-1">
          <div className="flex py-3 items-center justify-between">
            <div className="text-[13px] text-[#455A64] leading-4">Send Unique Emails Only</div>
            <div className="flex">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name={'uniqueEmail'}
                  value={values.UniqueEmailOnly}
                  defaultChecked={values.UniqueEmailOnly === 1}
                  onChange={(e) => {
                    setFieldValue('UniqueEmailOnly', e.target.checked ? 1 : 0)
                  }}
                  className="sr-only peer"
                />
                <div className="relative w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[50%] after:translate-y-[-50%] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-jg-green-600 peer-checked:after:left-[calc(100%-14px)] after:shadow-sm"></div>
              </label>
            </div>
          </div>
          <div className="flex py-3 items-center justify-between">
            <div className="text-[13px] text-[#455A64] leading-4">Exclude Members Under 16</div>
            <div className="flex">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="excludeUnder16"
                  value={values.ExcludeUnder16}
                  defaultChecked={values.ExcludeUnder16 === 1}
                  onChange={(e) => {
                    setFieldValue('ExcludeUnder16', e.target.checked ? 1 : 0)
                  }}
                  className="sr-only peer"
                />
                <div className="relative w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[50%] after:translate-y-[-50%] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-jg-green-600 peer-checked:after:left-[calc(100%-14px)] after:shadow-sm"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OptinsComponents
