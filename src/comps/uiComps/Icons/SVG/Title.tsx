import { SVGProps } from '../SVGProps'

export default function Title({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `14`}
        height={height || `15`}
        viewBox="0 0 14 15"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M0 0V3H5.5V15H8.5V3H14V0H0Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
