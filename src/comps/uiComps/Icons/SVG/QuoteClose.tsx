import { SVGProps } from '../SVGProps'

export default function QuoteClose({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `14`}
        height={height || `10`}
        viewBox="0 0 14 10"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M9 10H12L14 6V0H8V6H11L9 10ZM1 10H4L6 6V0H0V6H3L1 10Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
