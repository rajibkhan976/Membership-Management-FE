import { SVGProps } from '../SVGProps'

export default function MenuLeft({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `5`}
        height={height || `10`}
        viewBox="0 0 5 10"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M5 0L0 5L5 10V0Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
