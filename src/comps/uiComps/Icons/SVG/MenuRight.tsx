import { SVGProps } from '../SVGProps'

export default function MenuRight({ fill, height, width, className }: SVGProps) {
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
        <path d="M0 10L5 5L0 0V10Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
