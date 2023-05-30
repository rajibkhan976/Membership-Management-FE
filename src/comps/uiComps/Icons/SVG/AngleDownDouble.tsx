import { SVGProps } from '../SVGProps'

export default function AngleDownDouble({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `16`}
        height={height || `16`}
        viewBox="0 0 16 16"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M4.62143 3L7.99935 6.3719L11.3773 3L12.3327 3.95372L7.99935 8.27934L3.66602 3.95372L4.62143 3ZM4.62143 7.72066L7.99935 11.0926L11.3773 7.72066L12.3327 8.67438L7.99935 13L3.66602 8.67438L4.62143 7.72066Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
