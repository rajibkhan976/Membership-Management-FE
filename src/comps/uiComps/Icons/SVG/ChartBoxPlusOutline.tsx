import { SVGProps } from '../SVGProps'

export default function ChartBoxPlusOutline({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `19`}
        height={height || `19`}
        viewBox="0 0 19 19"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M19 3V5H16V8H14V5H11V3H14V0H16V3H19ZM16 17H2V3H8V1H2C0.9 1 0 1.9 0 3V17C0 18.1 0.9 19 2 19H16C17.1 19 18 18.1 18 17V11H16V17ZM12 11V15H14V11H12ZM8 15H10V7H8V15ZM6 15V9H4V15H6Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
