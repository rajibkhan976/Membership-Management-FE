import { SVGProps } from '../SVGProps'

export default function IndentIncrease({ fill, height, width, className }: SVGProps) {
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
          d="M8 10H18V8H8V10ZM8 6H18V4H8V6ZM0 0V2H18V0H0ZM8 14H18V12H8V14ZM0 5V13L4 9L0 5ZM0 18H18V16H0V18Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
