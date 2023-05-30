import { SVGProps } from '../SVGProps'

export default function AlignRight({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `16`}
        height={height || `16`}
        viewBox="0 0 18 18"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M0 0H18V2H0V0ZM6 4H18V6H6V4ZM0 8H18V10H0V8ZM6 12H18V14H6V12ZM0 16H18V18H0V16Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
