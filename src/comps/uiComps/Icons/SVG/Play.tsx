import { SVGProps } from '../SVGProps'

export default function Play({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `11`}
        height={height || `15`}
        viewBox="0 0 11 15"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M0 0.140015V14.14L11 7.14002L0 0.140015Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
