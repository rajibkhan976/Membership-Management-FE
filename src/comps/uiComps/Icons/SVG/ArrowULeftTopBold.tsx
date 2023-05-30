import { SVGProps } from '../SVGProps'

export default function ArrowULeftTopBold({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `17`}
        height={height || `19`}
        viewBox="0 0 17 19"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M9.5 19H2V15H9.5C11.43 15 13 13.43 13 11.5C13 9.57 11.43 8 9.5 8H7V12L0 6L7 0V4H9.5C13.64 4 17 7.36 17 11.5C17 15.64 13.64 19 9.5 19Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
