import { SVGProps } from '../SVGProps'

export default function ChevronLeft({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `8`}
        height={height || `12`}
        viewBox="0 0 8 12"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M7.41 10.58L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.58Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
