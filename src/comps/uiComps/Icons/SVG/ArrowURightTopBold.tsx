import { SVGProps } from '../SVGProps'

export default function ArrowURightTopBold({ fill, height, width, className }: SVGProps) {
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
          d="M0 11.5C0 7.36 3.36 4 7.5 4H10V0L17 6L10 12V8H7.5C5.57 8 4 9.57 4 11.5C4 13.43 5.57 15 7.5 15H15V19H7.5C3.36 19 0 15.64 0 11.5Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
