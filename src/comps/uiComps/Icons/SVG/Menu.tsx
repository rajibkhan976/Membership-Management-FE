import { SVGProps } from '../SVGProps'

export default function Menu({ fill, height, width, className }: SVGProps) {
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
        <path d="M0 0H18V2H0V0ZM0 5H18V7H0V5ZM0 10H18V12H0V10Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
