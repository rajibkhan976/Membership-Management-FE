import { SVGProps } from '../SVGProps'

export default function SendNow({ fill, height, width, className }: SVGProps) {
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
          d="M8.33333 12C8.33333 9.79333 10.1267 8 12.3333 8C13.0667 8 13.7467 8.2 14.3333 8.54V3.33333C14.3333 2.59333 13.7333 2 13 2H2.33333C1.59333 2 1 2.59333 1 3.33333V11.3333C1 12.0733 1.6 12.6667 2.33333 12.6667H8.39333C8.36 12.4467 8.33333 12.2267 8.33333 12ZM2.33333 4.66667V3.33333L7.66667 6.66667L13 3.33333V4.66667L7.66667 8L2.33333 4.66667ZM13 14V12.6667H10.3333V11.3333H13V10L15 12L13 14Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
