import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import React, { Fragment, useEffect, useRef, useState } from 'react'

type FAQPorps = {
  faqs: {
    question: string
    answer: JSX.Element
  }[]
  defaultOpenIndex?: number
}

const FAQ = ({ faqs, defaultOpenIndex }: FAQPorps) => {
  const [opened, setOpened] = useState<number | undefined>(defaultOpenIndex)

  return (
    <div className="mx-auto w-full">
      <div className="mx-auto divide-y-2 divide-jg-metal-50">
        <dl className="space-y-2.5 ">
          {faqs.map((faq, i) => (
            <Disclosure
              as="div"
              key={faq.question}
              className="border divide-y divide-jg-metal-50"
              defaultOpen={i === defaultOpenIndex}
              onClick={() => setOpened(i)}
            >
              {({ open, close }) => {
                return (
                  <DisclosureBody
                    {...{ open, close, question: faq.question, answer: faq.answer, i, opened, setOpened }}
                  />
                )
              }}
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default FAQ

const DisclosureBody = ({
  open,
  close,
  question,
  answer,
  i,
  opened,
  setOpened,
}: {
  open: boolean
  close: () => void
  question: string
  answer: React.ReactNode
  i: number
  opened?: number
  setOpened: (v?: number) => void
}) => {
  const firstRender = useRef(true)
  useEffect(() => {
    if (!firstRender.current) {
      if (!open && opened === i) {
        setOpened(undefined)
      }
      if (opened !== i) setTimeout(close, 100)
    }
    firstRender.current = false
  })

  return (
    <>
      <dt className="overflow-hidden">
        <Disclosure.Button className="flex w-full items-center gap-2 text-left text-jg-metal-700 p-3 overflow-hidden">
          <span className="flex items-center">
            <ChevronDownIcon
              className={classNames(opened === i ? '-rotate-180' : 'rotate-0', 'h-3 w-3 transform')}
              aria-hidden="true"
            />
          </span>
          <span className="text-sm leading-4 font-medium">{question}</span>
        </Disclosure.Button>
      </dt>
      <Transition
        show={opened === i}
        enter="transform transition-all delay-100 duration-[800ms] ease-linear overflow-hidden"
        enterFrom="max-h-0"
        enterTo="max-h-[1000px]"
      >
        <Transition.Child
          enter="transform transition-all delay-100 duration-[200ms] ease-linear"
          enterFrom="opacity-0 scale-96 "
          enterTo="opacity-100 scale-100 "
          leave="transform transition-all duration-[200ms] ease-linear overflow-hidden h-auto"
          leaveFrom="max-h-[300px] opacity-5"
          leaveTo="max-h-0 opacity-0"
        >
          <Disclosure.Panel as="dd" className="p-3 h-auto overflow-hidden">
            <div className="text-[13px] font-medium leading-5 text-jg-metal-500 overflow-hidden">{answer}</div>
          </Disclosure.Panel>
        </Transition.Child>
      </Transition>
    </>
  )
}
