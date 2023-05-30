import { SVGProps } from '../SVGProps'

export default function CalendarDay({ fill, height, width, className }: SVGProps) {
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
          d="M12.6667 2.66683H12V1.3335H10.6667V2.66683H5.33333V1.3335H4V2.66683H3.33333C2.6 2.66683 2 3.26016 2 4.00016V13.3335C2 14.0735 2.6 14.6668 3.33333 14.6668H12.6667C13.4067 14.6668 14 14.0735 14 13.3335V4.00016C14 3.26016 13.4067 2.66683 12.6667 2.66683ZM12.6667 13.3335H3.33333V6.66683H12.6667V13.3335ZM12.6667 5.3335H3.33333V4.00016H12.6667M4.66667 8.00016H8V11.3335H4.66667"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
