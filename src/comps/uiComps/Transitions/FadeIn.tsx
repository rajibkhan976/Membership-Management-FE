import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

const FadeIn = ({ children, className }: { children?: import('react').ReactNode; className?: string }) => {
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-250"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      as="div"
      className={className}
    >
      {children}
    </Transition>
  )
}

export default FadeIn
