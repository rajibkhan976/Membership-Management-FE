import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

type ProviderOptionType = {
  name?: string
  value?: string
}
type ProviderRadioGroupProps = {
  providers: ProviderOptionType[]
  selectedValue: string
  onChange: (value: string) => void
}
export default function ProviderRadioGroup({ providers, selectedValue, onChange }: ProviderRadioGroupProps) {
  //const [selected, setSelected] = useState(providers[0])

  return (
    <div className="w-full px-0 py-3">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={selectedValue}
          onChange={(_value: string) => {
            onChange(_value)
          }}
        >
          <RadioGroup.Label className="sr-only">Prodider</RadioGroup.Label>
          <div className="space-y-2">
            {providers.map((provider) => (
              <RadioGroup.Option
                key={provider.value}
                value={provider.value}
                className={({ active, checked }) =>
                  `${active ? 'ring-1 ring-jg-grey-500 ring-opacity-60 ' : ''}
                  ${checked ? 'bg-jg-green-500 bg-opacity-75 ' : 'bg-white'}
                    relative flex cursor-pointer rounded-md px-3 py-1.5 shadow-sm focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                          >
                            {provider.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'}`}
                          ></RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
