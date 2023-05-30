import { SVGProps } from '../SVGProps'

export default function LeftArrow({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `24`}
        height={height || `24`}
        viewBox="0 0 24 24"
        fill={fill || `currentColor`}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6298 5.93058L6.74231 10.9884H21V13.0116H6.74231L11.6298 18.0694L10.2474 19.5L3 12L10.2474 4.5L11.6298 5.93058Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
