import { SVGProps } from '../SVGProps'

export default function Plus({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `14`}
        height={height || `14`}
        viewBox="0 0 14 14"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
