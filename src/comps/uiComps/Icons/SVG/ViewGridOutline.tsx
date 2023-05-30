import { SVGProps } from '../SVGProps'

export default function ViewGridOutline({ fill, height, width, className }: SVGProps) {
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
          d="M0 8H8V0H0V8ZM2 2H6V6H2V2ZM10 18H18V10H10V18ZM12 12H16V16H12V12ZM0 18H8V10H0V18ZM2 12H6V16H2V12ZM10 0V8H18V0H10ZM16 6H12V2H16V6Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
