import { SVGProps } from '../SVGProps'

export default function Minus({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `14`}
        height={height || `2`}
        viewBox="0 0 14 2"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M14 2H0V0H14V2Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
