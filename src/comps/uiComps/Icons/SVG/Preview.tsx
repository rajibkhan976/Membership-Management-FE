import { SVGProps } from '../SVGProps'

export default function Preview({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `16`}
        height={height || `20`}
        viewBox="0 0 16 20"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M10 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6L10 0ZM2 2H9L14 7V15.58L12.16 13.74C13.44 11.8 13.23 9.17 11.52 7.46C10.55 6.49 9.28 6 8 6C6.72 6 5.45 6.49 4.47 7.46C2.52 9.41 2.52 12.57 4.47 14.51C5.44 15.48 6.72 15.97 8 15.97C8.96 15.97 9.92 15.69 10.75 15.14L13.6 18H2V2ZM10.11 13.1C9.55 13.66 8.8 13.98 8 13.98C7.2 13.98 6.45 13.67 5.89 13.1C5.33 12.54 5.01 11.79 5.01 10.99C5.01 10.19 5.32 9.44 5.89 8.88C6.45 8.31 7.2 8 8 8C8.8 8 9.55 8.31 10.11 8.88C10.67 9.44 10.99 10.19 10.99 10.99C10.99 11.79 10.68 12.54 10.11 13.1Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
