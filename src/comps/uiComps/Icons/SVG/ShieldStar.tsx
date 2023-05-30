import { SVGProps } from '../SVGProps'

export default function ShieldStar({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `18`}
        height={height || `22`}
        viewBox="0 0 18 22"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M9 0L0 4V10C0 15.55 3.84 20.74 9 22C14.16 20.74 18 15.55 18 10V4L9 0ZM12.08 15L9 13.15L5.93 15L6.74 11.5L4.03 9.16L7.61 8.85L9 5.55L10.39 8.84L13.97 9.15L11.26 11.5L12.08 15Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
