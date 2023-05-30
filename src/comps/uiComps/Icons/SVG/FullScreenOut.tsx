import { SVGProps } from '../SVGProps'

export default function FullScreenOut({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `24`}
        height={height || `24`}
        viewBox="0 0 24 24"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M14 14H19V16H16V19H14V14ZM5 14H10V19H8V16H5V14ZM8 5H10V10H5V8H8V5ZM19 8V10H14V5H16V8H19Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
