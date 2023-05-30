import { SVGProps } from '../SVGProps'

export default function ChevronDoubleRight({ fill, height, width, className }: SVGProps) {
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
          d="M0.589844 1.41L1.99984 0L7.99984 6L1.99984 12L0.589844 10.59L5.16984 6L0.589844 1.41ZM6.58984 1.41L7.99984 0L13.9998 6L7.99984 12L6.58984 10.59L11.1698 6L6.58984 1.41Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
