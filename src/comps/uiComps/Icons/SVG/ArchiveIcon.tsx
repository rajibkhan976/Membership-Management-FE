import { SVGProps } from '../SVGProps'

export default function ArchiveIcon({ fill, height, width, className }: SVGProps) {
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
          d="M3.33333 14C2.96667 14 2.65267 13.8696 2.39133 13.6087C2.13044 13.3473 2 13.0333 2 12.6667V4.33333C2 4.16667 2.02778 4.01667 2.08333 3.88333C2.13889 3.75 2.21111 3.62222 2.3 3.5L3.23333 2.36667C3.32222 2.24444 3.43333 2.15267 3.56667 2.09133C3.7 2.03044 3.84444 2 4 2H12C12.1556 2 12.3 2.03044 12.4333 2.09133C12.5667 2.15267 12.6778 2.24444 12.7667 2.36667L13.7 3.5C13.7889 3.62222 13.8611 3.75 13.9167 3.88333C13.9722 4.01667 14 4.16667 14 4.33333V12.6667C14 13.0333 13.8696 13.3473 13.6087 13.6087C13.3473 13.8696 13.0333 14 12.6667 14H3.33333ZM3.6 4H12.4L11.8333 3.33333H4.16667L3.6 4ZM3.33333 5.33333V12.6667H12.6667V5.33333H3.33333ZM8 12L10.6667 9.33333L9.73333 8.4L8.66667 9.46667V6.66667H7.33333V9.46667L6.26667 8.4L5.33333 9.33333L8 12Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
