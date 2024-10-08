import { SVGProps } from '../SVGProps'

export default function AlignCenter({ fill, height, width, className }: SVGProps) {
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
          d="M0 0H18V2H0V0ZM4 4H14V6H4V4ZM0 8H18V10H0V8ZM4 12H14V14H4V12ZM0 16H18V18H0V16Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
