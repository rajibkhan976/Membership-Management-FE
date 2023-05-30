import { SVGProps } from '../SVGProps'

export default function Yahoo({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `20`}
        height={height || `18`}
        viewBox="0 0 20 18"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M8.5 4.58999L6.16 10.2L3.85 4.58999H0L4.29 14.23L2.75 17.7H6.5L12.24 4.58999H8.5ZM13 9.72999C11.63 9.72999 10.59 10.77 10.59 12C10.59 13.17 11.59 14.16 12.93 14.16C14.32 14.16 15.36 13.13 15.36 11.9C15.36 10.69 14.36 9.72999 13 9.72999ZM15.72 0.299988L11.89 8.88999H16.17L20 0.299988H15.72Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
