import { SVGProps } from '../SVGProps'

export default function TextBoxOutline({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `18`}
        height={height || `18`}
        viewBox="0 0 18 18"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M2 0C0.89 0 0 0.89 0 2V16C0 17.11 0.89 18 2 18H16C17.11 18 18 17.11 18 16V2C18 0.89 17.11 0 16 0H2ZM2 2H16V16H2V2ZM4 4V6H14V4H4ZM4 8V10H14V8H4ZM4 12V14H11V12H4Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
