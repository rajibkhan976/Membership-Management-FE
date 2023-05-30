import { SVGProps } from '../SVGProps'

export default function CalendarMonth({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `18`}
        height={height || `20`}
        viewBox="0 0 18 20"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M6 9V11H4V9H6ZM10 9V11H8V9H10ZM14 9V11H12V9H14ZM16 2C16.5304 2 17.0391 2.21071 17.4142 2.58579C17.7893 2.96086 18 3.46957 18 4V18C18 18.5304 17.7893 19.0391 17.4142 19.4142C17.0391 19.7893 16.5304 20 16 20H2C0.89 20 0 19.1 0 18V4C0 3.46957 0.210714 2.96086 0.585786 2.58579C0.960859 2.21071 1.46957 2 2 2H3V0H5V2H13V0H15V2H16ZM16 18V7H2V18H16ZM6 13V15H4V13H6ZM10 13V15H8V13H10ZM14 13V15H12V13H14Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
