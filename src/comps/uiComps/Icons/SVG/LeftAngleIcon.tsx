import { SVGProps } from '../SVGProps'

export default function LeftAngleIcon({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `20`}
        height={height || `20`}
        viewBox="0 0 20 20"
        fill={fill || `currentColor`}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.45141 3.75L13.75 10L7.45141 16.25L6.25 15.0579L11.3472 10L6.25 4.94215L7.45141 3.75Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
