import { SVGProps } from '../SVGProps'

export default function ArrowURightTop({ fill, height, width, className }: SVGProps) {
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
          d="M6.5 16H14V18H6.5C2.91 18 0 15.09 0 11.5C0 7.91 2.91 5 6.5 5H12.17L9.08 1.91L10.5 0.5L16 6L10.5 11.5L9.09 10.09L12.17 7H6.5C4 7 2 9 2 11.5C2 14 4 16 6.5 16Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
