import { SVGProps } from '../SVGProps'

export default function ChevronRight({ fill, height, width, className }: SVGProps) {
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
        <path
          d="M0.589844 10.59L5.16984 6L0.589844 1.41L1.99984 0L7.99984 6L1.99984 12L0.589844 10.59Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
