import { SVGProps } from '../SVGProps'

export default function CheckAll({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `24`}
        height={height || `14`}
        viewBox="0 0 24 14"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M0.410156 8.40999L6.00016 14L7.41016 12.58L1.83016 6.99999L0.410156 8.40999ZM22.2402 0.579987L11.6602 11.17L7.50016 6.99999L6.07016 8.40999L11.6602 14L23.6602 1.99999L22.2402 0.579987ZM18.0002 1.99999L16.5902 0.579987L10.2402 6.92999L11.6602 8.33999L18.0002 1.99999Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
