import { SVGProps } from '../SVGProps'

export default function ChevronDoubleLeft({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `14`}
        height={height || `12`}
        viewBox="0 0 14 12"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M13.41 1.41L12 0L6 6L12 12L13.41 10.59L8.83 6L13.41 1.41ZM7.41 1.41L6 0L0 6L6 12L7.41 10.59L2.83 6L7.41 1.41Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
