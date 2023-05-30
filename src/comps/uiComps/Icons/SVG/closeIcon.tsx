import { SVGProps } from '../SVGProps'

export default function CloseIcon({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `24`}
        height={height || `24`}
        viewBox="0 0 24 24"
        className={className}
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
