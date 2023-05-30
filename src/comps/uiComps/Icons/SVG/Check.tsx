import { SVGProps } from '../SVGProps'

export default function Check({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `18`}
        height={height || `14`}
        viewBox="0 0 18 14"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M18 2L6 14L0.5 8.5L1.91 7.09L6 11.17L16.59 0.589996L18 2Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
