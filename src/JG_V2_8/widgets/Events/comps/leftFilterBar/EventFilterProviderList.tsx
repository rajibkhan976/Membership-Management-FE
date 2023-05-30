import classNames from 'classnames'
import { useEventFilterProviderContext } from './EventFilterOptionProvider'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import { ProviderOptionType } from './ProviderCheckboxGroup'

const EventFilterProviderList = ({
  providers,
  selectedValue,
  onChange,
}: {
  providers: ProviderOptionType[]
  selectedValue: string[]
  onChange: (isChecked: boolean, value?: string[], oldValue?: string, oldList?: string[]) => void
}) => {
  const searchKey = useEventFilterProviderContext((state) => state.searchKey)
  let _selectedValue: string[] = []
  // console.log('[_selectedValue', selectedValue)
  //let isMyOrOtherOrg = false
  /*selectedValue.forEach((i) => {
    switch (i) {
      case '0':
        _selectedValue.push((0).toString())
        break
      case 'club':
        providers.forEach((e) => {
          if (e.isMyProvider === 1 && e.providerType === 'Club') {
            _selectedValue.push((e.value || 0).toString())
          }
        })
        break
      case 'region':
        providers.forEach((e) => {
          if (e.isMyProvider === 1 && e.providerType === 'Region') {
            _selectedValue.push((e.value || 0).toString())
          }
        })
        break
      case 'sub-region':
        providers.forEach((e) => {
          if (e.isMyProvider === 1 && e.providerType === 'Sub Region') {
            _selectedValue.push((e.value || 0).toString())
          }
        })
        break
    }
  })
  if (!_selectedValue.length) _selectedValue = selectedValue*/
  if ('[club][region][sub-region][my-provider][!my-provider]'.indexOf(`[${selectedValue[0]}]`) > -1) {
    if (selectedValue[0] === 'my-provider') _selectedValue.push('0')
    providers.forEach((e) => {
      if (e.isMyProvider === 1) {
        if (e.providerType === 'Club' && selectedValue[0] === 'club') _selectedValue.push((e.value || 0).toString())
        if (e.providerType === 'Region' && selectedValue[0] === 'region') _selectedValue.push((e.value || 0).toString())
        if (e.providerType === 'Sub Region' && selectedValue[0] === 'sub-region')
          _selectedValue.push((e.value || 0).toString())
        if ('[Club][Region][Sub Region]'.indexOf(`[${e.providerType}]`) > -1 && selectedValue[0] === 'my-provider')
          _selectedValue.push((e.value || 0).toString())
      }
      if (e.isMyProvider === 0) {
        if ('[Club][Region][Sub Region]'.indexOf(`[${e.providerType}]`) > -1 && selectedValue[0] === '!my-provider')
          _selectedValue.push((e.value || 0).toString())
      }
    })
  } else _selectedValue = selectedValue

  return (
    <div className="mx-auto w-full max-w-md event-provier-list">
      {providers.map((provider, index) => (
        <IndeterminateCheckbox
          key={index}
          className={classNames(
            'pt-2.5 pb-1 px-3.5 bg-jg-grey-50 hover:bg-jg-grey-100',
            (provider.name + ' ' + provider.caption)?.toLowerCase().indexOf(searchKey.toLowerCase()) > -1
              ? 'block'
              : 'hidden'
          )}
          indeterminate={false}
          checked={_selectedValue.indexOf(provider.value || '') > -1}
          labelClassName={'!text-jg-grey-700'}
          caption={
            <>
              {provider.name}
              <span className="block text-xs text-jg-grey-500 mt-[3px]">{provider.caption}</span>
            </>
          }
          title={provider.name}
          onChange={(isChecked) => {
            onChange(isChecked, provider.value ? [provider.value] : [])
          }}
        />
      ))}
    </div>
  )
}
export default EventFilterProviderList
