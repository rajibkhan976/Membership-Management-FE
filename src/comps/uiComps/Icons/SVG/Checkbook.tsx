import { SVGProps } from '../SVGProps'

export default function Checkbook({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `22`}
        height={height || `14`}
        viewBox="0 0 22 14"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M4 9H18V10H4V9ZM20 12V3H2V12H20ZM0 0H22V14H0V0ZM4 5H11V7H4V5Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
