import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

const Expand = ({
  children,
  className,
  show,
}: {
  show?: boolean
  children?: import('react').ReactNode
  className?: string
}) => {
  return (
    <Transition
      show={show}
      enter="transition ease-in-out duration-1000 transform"
      enterFrom="translate-scale-0"
      enterTo="translate-scale-full"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
      as="div"
      className={className}
    >
      {children}
    </Transition>
  )
}

export default Expand
