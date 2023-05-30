import { useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/solid'
import { AccordionProps } from './AccordionProps'

// function Accordion({items=[], ...props}:AccordionProps) {
function Accordion(props: AccordionProps) {
  // console.log('init SimpleSelect', props)
  const { items = [] } = props

  const [disclosures, setDisclosures] = useState(items)

  const handleClick = (itemIndex: number) => {
    setDisclosures(
      disclosures.map((d, index) => (itemIndex === index ? { ...d, isOpen: !d.isOpen } : { ...d, isOpen: false }))
    )
  }
  return (
    <div className="bg-white-50 border-b border-gray-300">
      <div className="w-full">
        <div className="w-full divide-y-2 divide-gray-300">
          <div className="divide-y divide-gray-300">
            {disclosures.map(({ isOpen, title, content }, index) => (
              <div key={index} className="mt-0 m-0 py-3">
                <button
                  className="text-left w-full px-3 flex justify-between items-start text-gray-400"
                  onClick={() => {
                    handleClick(index)
                  }}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-sm text-gray-600">{title}</span>
                  <span className="ml-6 h-7 flex items-center">
                    {isOpen ? <MinusIcon className="h-5 w-5 transform" /> : <PlusIcon className="h-5 w-5 transform" />}
                  </span>
                </button>
                <div
                  {...(isOpen
                    ? {
                        className:
                          'pb-2 text-sm text-gray-500 h-auto transition translate-y-3 duration-500 ease-in opacity-100 overflow-hidden relative',
                      }
                    : {
                        className:
                          'relative text-sm text-gray-500 h-0 translate-y-0 transition duration-500 ease-out opacity-0 overflow-hidden',
                      })}
                >
                  {content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
