import { SVGProps } from '../SVGProps'

export default function SettingsVertical({ fill, height, width, className }: SVGProps) {
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
          d="M4 0H2V6H4V0ZM16 0H14V10H16V0ZM0 10H2V18H4V10H6V8H0V10ZM12 4H10V0H8V4H6V6H12V4ZM8 18H10V8H8V18ZM12 12V14H14V18H16V14H18V12H12Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
