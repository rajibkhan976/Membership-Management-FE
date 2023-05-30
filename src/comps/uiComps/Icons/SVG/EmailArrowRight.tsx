import { SVGProps } from '../SVGProps'

export default function EmailArrowRight({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `21`}
        height={height || `18`}
        viewBox="0 0 21 18"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M11 15C11 11.69 13.69 9 17 9C18.1 9 19.12 9.3 20 9.81V2C20 0.89 19.1 0 18 0H2C0.89 0 0 0.89 0 2V14C0 15.11 0.9 16 2 16H11.09C11.04 15.67 11 15.34 11 15ZM2 4V2L10 7L18 2V4L10 9L2 4ZM18 18V16H14V14H18V12L21 15L18 18Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
