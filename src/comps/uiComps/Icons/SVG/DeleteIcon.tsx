import { SVGProps } from '../SVGProps'

export default function DeleteIcon({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `16`}
        height={height || `16`}
        viewBox="0 0 16 16"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M4.66663 14C4.29996 14 3.98618 13.8696 3.72529 13.6087C3.46396 13.3473 3.33329 13.0333 3.33329 12.6667V4H2.66663V2.66667H5.99996V2H9.99996V2.66667H13.3333V4H12.6666V12.6667C12.6666 13.0333 12.5362 13.3473 12.2753 13.6087C12.014 13.8696 11.7 14 11.3333 14H4.66663ZM5.99996 11.3333H7.33329V5.33333H5.99996V11.3333ZM8.66663 11.3333H9.99996V5.33333H8.66663V11.3333Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
