import { SVGProps } from '../SVGProps'

export default function InboxFull({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `18`}
        height={height || `18`}
        viewBox="0 0 18 18"
        fill={fill || 'currentColor'}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M16 12V2H2V12H6C6 13.66 7.34 15 9 15C10.66 15 12 13.66 12 12H16ZM16 0C17.1 0 18 0.9 18 2V16C18 17.1 17.1 18 16 18H2C0.89 18 0 17.1 0 16V2C0 0.9 0.89 0 2 0H16ZM4 10V8H14V10H4ZM4 6V4H14V6H4Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
