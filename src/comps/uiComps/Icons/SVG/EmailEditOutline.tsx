import { SVGProps } from '../SVGProps'

export default function EmailEditOutline({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `21`}
        height={height || `18`}
        viewBox="0 0 21 18"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M17.07 9.88L11 15.94V18H13.06L19.12 11.93M20.7 9.58L19.42 8.3C19.32 8.19 19.18 8.13 19.04 8.13C18.89 8.14 18.75 8.19 18.65 8.3L17.65 9.3L19.7 11.3L20.7 10.3C20.89 10.1 20.89 9.78 20.7 9.58ZM9 14H2V4L10 9L18 4V6H20V2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H9V14ZM18 2L10 7L2 2H18Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
