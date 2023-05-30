import { SVGProps } from '../SVGProps'

export default function ListNumbered({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `19`}
        height={height || `16`}
        viewBox="0 0 19 16"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M5 9V7H19V9H5ZM5 15V13H19V15H5ZM5 3V1H19V3H5ZM1 4V1H0V0H2V4H1ZM0 13V12H3V16H0V15H2V14.5H1V13.5H2V13H0ZM2.25 6C2.44891 6 2.63968 6.07902 2.78033 6.21967C2.92098 6.36032 3 6.55109 3 6.75C3 6.95 2.92 7.14 2.79 7.27L1.12 9H3V10H0V9.08L2 7H0V6H2.25Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
