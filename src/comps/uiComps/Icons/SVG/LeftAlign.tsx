import { SVGProps } from '../SVGProps'

export default function LeftAlign({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `24`}
        height={height || `24`}
        viewBox="0 0 24 24"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {' '}
        <path
          d="M16.5 5.93058L10.3834 12L16.5 18.0694L15.0583 19.5L7.5 12L15.0583 4.5L16.5 5.93058Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
