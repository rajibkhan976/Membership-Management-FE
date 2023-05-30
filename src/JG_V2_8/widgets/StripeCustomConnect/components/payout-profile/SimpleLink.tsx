import { ElementType } from 'react'

const SimpleLink = ({
  to,
  text,
  RightIcon,
  className,
  ...props
}: {
  to: string
  text: string
  RightIcon: React.ReactNode
  className: string
} & React.ComponentProps<'a'>) => {
  const { href, ...rest } = props
  const goto = href || to
  return (
    <a href={goto} className={'inline-flex gap-2 items-center ' + className} {...rest}>
      <span className="whitespace-nowrap font-medium text-[13px] leading-4">{text}</span>
      {RightIcon}
    </a>
  )
}

export default SimpleLink
