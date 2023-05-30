import clsx from 'clsx'

interface IAvatar {
  src?: string
  shape?: 'circular' | 'rounded'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  bordered?: boolean
  name?: string
  withNameInitials?: boolean
}

const sizes: Record<IAvatar['size'] & string, string> = {
  xs: 'h-6 w-6',
  sm: 'h-7 w-7',
  md: 'h-8 w-8',
  lg: 'h-9 w-9',
  xl: 'h-10 w-10',
  xxl: 'h-12 w-12',
}

const textSize = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  xxl: 'text-globalTextSizeXl',
}

const shapes: Record<IAvatar['shape'] & string, string> = {
  circular: 'rounded-full',
  rounded: 'rounded-md',
}

const Avatar: React.FC<IAvatar> = ({
  src = '',
  shape = 'circular',
  size,
  bordered = true,
  name = '',
  withNameInitials = false,
}) => {
  const className = clsx(
    bordered ? 'border border-jg-metal-200 ' : '',
    '  inline-block overflow-hidden object-cover',
    (size && sizes[size]) || sizes.md,
    (shape && shapes[shape]) || shapes.circular,
    bordered && 'ring-2 ring-white'
  )

  if (withNameInitials) {
    return <AvatarWithInitials className={className} name={name} size={size} />
  }

  if (src) {
    return <img className={className} src={src} alt={name} loading="lazy" />
  }

  return <EmptyAvatar className={className} />
}

function AvatarWithInitials({
  className = 'h-8 w-8 rounded-full',
  name = '',
  size = 'md',
}: {
  className: string
  name: string
  size: IAvatar['size']
}) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-jg-grey-50  border border-jg-metal-200  shadow ${className}`}
    >
      <span className={`${textSize[size]} font-normal leading-none text-jg-metal-300`}>
        {createAvatarInitials(name)}
      </span>
    </span>
  )
}

function EmptyAvatar({ className = 'inline-block rounded-full overflow-hidden h-10 w-10' }: { className: string }) {
  return (
    <span className={`bg-gray-100 ${className}`}>
      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  )
}

const createAvatarInitials = (name = ''): string =>
  name
    .match(/(^\S\S?|\s\S)?/g)!
    .map((v) => v.trim())
    .join('')
    .match(/(^\S|\S$)?/g)!
    .join('')
    .toLocaleUpperCase()

export default Avatar
