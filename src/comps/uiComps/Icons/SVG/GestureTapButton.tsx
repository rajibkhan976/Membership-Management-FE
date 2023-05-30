import { SVGProps } from '../SVGProps'

export default function GestureTapButton({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `20`}
        height={height || `20`}
        viewBox="0 0 20 20"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M11 3C13.21 3 15 4.79 15 7C15 8.5 14.2 9.77 13 10.46V9.24C13.61 8.69 14 7.89 14 7C14 5.34 12.66 4 11 4C9.34 4 8 5.34 8 7C8 7.89 8.39 8.69 9 9.24V10.46C7.8 9.77 7 8.5 7 7C7 4.79 8.79 3 11 3ZM18 18.5C17.97 19.32 17.32 19.97 16.5 20H11C10.62 20 10.26 19.85 10 19.57L6 15.37L6.74 14.6C6.93 14.39 7.2 14.28 7.5 14.28H7.7L10 16V7C10 6.45 10.45 6 11 6C11.55 6 12 6.45 12 7V11.47L13.21 11.6L17.15 13.79C17.68 14.03 18 14.56 18 15.14V18.5ZM18 0H2C0.9 0 0 0.9 0 2V10C0 11.11 0.9 12 2 12H6V10H2V2H18V10H16V12H18V11.96L18.04 12C19.13 12 20 11.09 20 10V2C20 0.9 19.11 0 18 0Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
