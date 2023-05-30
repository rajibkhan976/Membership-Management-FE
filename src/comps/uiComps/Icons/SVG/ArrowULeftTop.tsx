import { SVGProps } from '../SVGProps'

export default function ArrowULeftTop({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `16`}
        height={height || `18`}
        viewBox="0 0 16 18"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M16 11.5C16 15.09 13.09 18 9.5 18H2V16H9.5C12 16 14 14 14 11.5C14 9 12 7 9.5 7H3.83L6.91 10.09L5.5 11.5L0 6L5.5 0.5L6.92 1.91L3.83 5H9.5C13.09 5 16 7.91 16 11.5Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
