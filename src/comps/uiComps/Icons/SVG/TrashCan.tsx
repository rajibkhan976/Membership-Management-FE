import { SVGProps } from '../SVGProps'

export default function TrashCan({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `16`}
        height={height || `16`}
        viewBox="0 0 16 16"
        className={className}
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.6665 14C4.29984 14 3.98606 13.8696 3.72517 13.6087C3.46384 13.3473 3.33317 13.0333 3.33317 12.6667V4H2.6665V2.66667H5.99984V2H9.99984V2.66667H13.3332V4H12.6665V12.6667C12.6665 13.0333 12.5361 13.3473 12.2752 13.6087C12.0138 13.8696 11.6998 14 11.3332 14H4.6665ZM11.3332 4H4.6665V12.6667H11.3332V4ZM5.99984 11.3333H7.33317V5.33333H5.99984V11.3333ZM8.6665 11.3333H9.99984V5.33333H8.6665V11.3333Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
