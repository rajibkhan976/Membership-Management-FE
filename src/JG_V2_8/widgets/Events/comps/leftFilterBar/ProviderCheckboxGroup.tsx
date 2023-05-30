import { useCallback, useRef, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import { CompBaseProps } from '@comps/uiComps'
import classNames from 'classnames'
import _ from 'lodash'
import EventFilterProviderList from './EventFilterProviderList'
import Toggle from '@comps/uiComps/Toggle/Toggle'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'

export type ProviderOptionType = {
  name?: string
  value?: string
  caption?: string
  isMyProvider?: number
  providerType?: string
}
type ProviderCheckboxGroupProps = CompBaseProps & {
  providers: ProviderOptionType[]
  selectedValue: string[]
  onChange: (value: string[]) => void
}
export default function ProviderCheckboxGroup({
  providers,
  selectedValue,
  onChange,
  className,
}: ProviderCheckboxGroupProps) {
  //const [selected, setSelected] = useState(providers[0])
  const checkedRef = useRef<string[]>([])
  const onCheckboxChange = (isChecked: boolean, providerIds?: string[]) => {
    /* let len = selectedValue.length - 1
    while (len > -1) {
      // checkedRef.current.pop()
      const providerArg = selectedValue[len]
      switch (providerArg) {
        case 'club':
          checkedRef.current.pop()
          providers.forEach((e) => {
            if (e.value && e.isMyProvider === 1 && e.providerType === 'Club') {
              checkedRef.current.push(e.value)
            }
          })
          break
        case 'region':
          checkedRef.current.pop()
          providers.forEach((e) => {
            if (e.value && e.isMyProvider === 1 && e.providerType === 'Region') {
              checkedRef.current.push(e.value)
            }
          })
          break
        case 'sub-region':
          checkedRef.current.pop()
          providers.forEach((e) => {
            if (e.value && e.isMyProvider === 1 && e.providerType === 'Sub Region') {
              checkedRef.current.push(e.value)
            }
          })
          break
      }
      len--
    }*/

    if ('[club][region][sub-region][my-provider][!my-provider]'.indexOf(`[${selectedValue[0]}]`) > -1) {
      checkedRef.current.pop()
      if (selectedValue[0] === 'my-provider') checkedRef.current.push('0')
      providers.forEach((e) => {
        if (e.value && e.isMyProvider === 1) {
          if (selectedValue[0] === 'club' && e.providerType === 'Club') checkedRef.current.push(e.value)
          if (selectedValue[0] === 'region' && e.providerType === 'Region') checkedRef.current.push(e.value)
          if (selectedValue[0] === 'sub-region' && e.providerType === 'Sub Region') checkedRef.current.push(e.value)
          if (selectedValue[0] === 'my-provider' && '[Club][Region][Sub Region]'.indexOf(`[${e.providerType}]`) > -1)
            checkedRef.current.push(e.value)
        }
        if (e.value && e.isMyProvider === 0) {
          if (selectedValue[0] === '!my-provider' && '[Club][Region][Sub Region]'.indexOf(`[${e.providerType}]`) > -1)
            checkedRef.current.push(e.value)
        }
      })
    }
    if (providerIds) {
      if (isChecked) {
        if (providerIds[0] === 'all') {
          checkedRef.current = ['all']
        }
        if (providerIds[0] === 'my-provider') {
          checkedRef.current = ['my-provider']
        }
        if (providerIds[0] === '!my-provider') {
          checkedRef.current = ['!my-provider']
        } else {
          _.remove(checkedRef.current, (ref) => ref === 'all' || ref === 'my-provider' || ref === '!my-provider')
          checkedRef.current = checkedRef.current.concat(providerIds)
        }
      } else {
        if (providerIds[0] === 'my-provider' || providerIds[0] === '!my-provider') {
          checkedRef.current = ['all']
        } else _.remove(checkedRef.current, (ref) => ref === providerIds[0])
      }
      onChange(checkedRef.current)
    }
  }

  return (
    <FancyScroll>
      <div className={classNames(' w-full', className)}>
        <IndeterminateCheckbox
          className="py-3  px-3.5 border-b border-bg-jg-grey-500 bg-jg-grey-50 hover:bg-jg-grey-100"
          indeterminate={false}
          checked={selectedValue[0] === 'all'}
          labelClassName={'!text-jg-grey-700'}
          caption={<>All</>}
          title={'All'}
          onChange={(isChecked) => {
            onCheckboxChange(isChecked, ['all'])
          }}
        />
        <div className="py-3  px-3.5 flex justify-between  border-b border-bg-jg-grey-500 bg-jg-grey-50 hover:bg-jg-grey-100 text-sm">
          <span>My Organisers</span>
          <Toggle
            value={selectedValue[0] === 'my-provider'}
            onChange={(value) => {
              onCheckboxChange(value, ['my-provider'])
            }}
          />
        </div>
        <EventFilterProviderList
          providers={providers.filter((e) => {
            return e.isMyProvider === 1 || e.providerType === 'Ngb'
          })}
          selectedValue={selectedValue}
          onChange={onCheckboxChange}
        />
        <div className="py-3  px-3.5 flex justify-between border-b border-t border-bg-jg-grey-500 bg-jg-grey-50 hover:bg-jg-grey-100 text-sm">
          <span>Other Organisers</span>
          <Toggle
            value={selectedValue[0] === '!my-provider'}
            onChange={(value) => {
              onCheckboxChange(value, ['!my-provider'])
            }}
          />
        </div>
        <EventFilterProviderList
          providers={providers.filter((e) => {
            return e.isMyProvider === 0 && e.providerType != 'Ngb'
          })}
          selectedValue={selectedValue}
          onChange={onCheckboxChange}
        />
      </div>
    </FancyScroll>
  )
}
