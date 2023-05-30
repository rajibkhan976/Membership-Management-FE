import { SVGProps } from '../SVGProps'

export default function MoviePlay({ fill, height, width, className }: SVGProps) {
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
          d="M20 0V9.81C19.12 9.3 18.1 9 17 9C13.69 9 11 11.69 11 15C11 15.34 11.04 15.67 11.09 16H2C0.9 16 0 15.11 0 14V2C0 0.89 0.9 0 2 0H3L5 4H8L6 0H8L10 4H13L11 0H13L15 4H18L16 0H20ZM15 18L20 15L15 12V18Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
