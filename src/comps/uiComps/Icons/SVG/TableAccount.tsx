import { SVGProps } from '../SVGProps'

export default function TableAccount({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `21`}
        height={height || `19`}
        viewBox="0 0 21 19"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M2 0H16C17.11 0 18 0.9 18 2V9.08C16.45 8.82 14.92 9.18 13.68 10H10V14H11.08C10.97 14.68 10.97 15.35 11.08 16H2C0.9 16 0 15.11 0 14V2C0 0.9 0.9 0 2 0ZM2 4V8H8V4H2ZM10 4V8H16V4H10ZM2 10V14H8V10H2ZM21 19V18C21 16.67 18.33 16 17 16C15.67 16 13 16.67 13 18V19H21ZM17 11C15.9 11 15 11.9 15 13C15 14.1 15.9 15 17 15C18.1 15 19 14.11 19 13C19 11.89 18.11 11 17 11Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
