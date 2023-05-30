import SettingIcon from '@comps/uiComps/Icons/SVG/SettingIcon'
import { useState } from 'react'
import type { SendEmailInitialValue } from '../types'
import ChipComponent from './chip'
import OptinsComponents from './optins'
import SideMenu from './sideMenu'
import TagsMenagement from './tags'

type OptinsComponentsProps = {
  setFieldValue: any
  values: SendEmailInitialValue
  handleChange: any
}

const OptinsAndSettingComponents = ({ setFieldValue, values, handleChange }: OptinsComponentsProps) => {
  const [isActive, setIsActive] = useState<string>('Opt-ins')

  const isActiveHandelar = (e: any) => {
    setIsActive(e.target.innerHTML)
  }

  return (
    <div className="flex items-center">
      <label htmlFor="addTags">
        <span className="cursor-pointer font-medium flex items-center text-[13px] gap-1 justify-center">
          <span className="text-base">
            <SettingIcon />
          </span>
          <span>Opt-ins & Settings</span>
        </span>
      </label>
      <SideMenu id={'addTags'} title={'Opt-ins & Settings'}>
        <>
          <div className="border-b">
            <div className="">
              <span
                onClick={(e) => isActiveHandelar(e)}
                className={`py-2 px-4 border-b font-medium inline-block ${
                  isActive === 'Opt-ins'
                    ? 'pointer-events-none text-[#4CAF4F] border-[#4CAF4F]'
                    : 'cursor-pointer text-[#263238] border-transparent'
                } `}
              >
                Opt-ins
              </span>
              <span
                onClick={(e) => isActiveHandelar(e)}
                className={`py-2 px-4 border-b font-medium inline-block ${
                  isActive === 'Tags'
                    ? 'pointer-events-none text-[#4CAF4F] border-[#4CAF4F]'
                    : 'cursor-pointer text-[#263238] border-transparent'
                } `}
              >
                Tags
              </span>
            </div>
          </div>
          {isActive === 'Opt-ins' && (
            <div className="">
              <OptinsComponents setFieldValue={setFieldValue} values={values} />
            </div>
          )}
          {isActive === 'Tags' && (
            <div className="p-4">
              <TagsMenagement setFieldValue={setFieldValue} values={values} handleChange={handleChange} />
            </div>
          )}
        </>
      </SideMenu>
      <div className="ml-3">
        {values.OptIns.length > 0 && <ChipComponent title={`${values.OptIns.length} Opt-ins Applied`} />}
        {values.Tags.length > 0 && <ChipComponent title={`${values.Tags.length} Tags selected`} />}
      </div>
    </div>
  )
}

export default OptinsAndSettingComponents
