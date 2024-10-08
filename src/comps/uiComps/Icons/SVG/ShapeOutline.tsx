import { SVGProps } from '../SVGProps'

export default function ShapeOutline({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `19`}
        height={height || `20`}
        viewBox="0 0 19 20"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M8 11.5V19.5H0V11.5H8ZM6 13.5H2V17.5H6V13.5ZM9 0L14.5 9H3.5L9 0ZM9 3.86L7.08 7H10.92L9 3.86ZM14.5 11C17 11 19 13 19 15.5C19 18 17 20 14.5 20C12 20 10 18 10 15.5C10 13 12 11 14.5 11ZM14.5 13C13.837 13 13.2011 13.2634 12.7322 13.7322C12.2634 14.2011 12 14.837 12 15.5C12 16.163 12.2634 16.7989 12.7322 17.2678C13.2011 17.7366 13.837 18 14.5 18C15.163 18 15.7989 17.7366 16.2678 17.2678C16.7366 16.7989 17 16.163 17 15.5C17 14.837 16.7366 14.2011 16.2678 13.7322C15.7989 13.2634 15.163 13 14.5 13Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
