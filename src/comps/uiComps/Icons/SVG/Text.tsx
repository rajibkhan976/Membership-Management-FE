import { SVGProps } from '../SVGProps'

export default function Text({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `18`}
        height={height || `12`}
        viewBox="0 0 18 12"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M18 0V2H0V0H18ZM0 12H9V10H0V12ZM0 7H18V5H0V7Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
