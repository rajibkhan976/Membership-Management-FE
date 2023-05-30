import { SVGProps } from '../SVGProps'

export default function CodeTags({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `20`}
        height={height || `12`}
        viewBox="0 0 20 12"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M12.6 10.6L17.2 6L12.6 1.4L14 0L20 6L14 12L12.6 10.6ZM7.4 10.6L2.8 6L7.4 1.4L6 0L0 6L6 12L7.4 10.6Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
