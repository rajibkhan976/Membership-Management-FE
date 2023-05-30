import { SVGProps } from '../SVGProps'

export default function Divider({ fill, height, width, className }: SVGProps) {
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
        <g clipPath="url(#clip0_1396_634)">
          <rect x="4" y="1" width="16" height="6" fill={fill || `currentColor`} />
          <rect y="11" width="24" height="2" fill={fill || `currentColor`} />
          <rect x="4" y="17" width="16" height="6" fill={fill || `currentColor`} />
        </g>
        <defs>
          <clipPath id="clip0_1396_634">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  )
}
