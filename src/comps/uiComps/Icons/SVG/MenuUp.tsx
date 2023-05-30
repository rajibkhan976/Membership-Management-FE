import { SVGProps } from '../SVGProps'

export default function MenuUp({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `10`}
        height={height || `5`}
        viewBox="0 0 10 5"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M0 5L5 0L10 5H0Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
