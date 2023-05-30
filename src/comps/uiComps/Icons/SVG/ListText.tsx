import { SVGProps } from '../SVGProps'

export default function ListText({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `20`}
        height={height || `16`}
        viewBox="0 0 24 24"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M2 14H8V20H2V14ZM16 8H10V10H16V8ZM2 10H8V4H2V10ZM10 4V6H22V4H10ZM10 20H16V18H10V20ZM10 16H22V14H10"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
