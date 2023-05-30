import { SVGProps } from '../SVGProps'

export default function CursorDefaultClick({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `19`}
        height={height || `24`}
        viewBox="0 0 19 24"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M8.76 8.69C8.55844 8.69 8.36513 8.77007 8.2226 8.9126C8.08007 9.05513 8 9.24844 8 9.45V20.9C8 21.32 8.34 21.66 8.76 21.66C8.95 21.66 9.11 21.6 9.24 21.5L11.15 19.95L12.81 23.57C12.94 23.84 13.21 24 13.5 24C13.61 24 13.72 24 13.83 23.92L16.59 22.64C16.97 22.46 17.15 22 16.95 21.63L15.28 18L17.69 17.55C17.85 17.5 18 17.43 18.12 17.29C18.39 16.97 18.35 16.5 18 16.21L9.26 8.86L9.25 8.87C9.12 8.76 8.95 8.69 8.76 8.69ZM13 10V8H18V10H13ZM11.83 4.76L14.66 1.93L16.07 3.34L13.24 6.17L11.83 4.76ZM8 0H10V5H8V0ZM1.93 14.66L4.76 11.83L6.17 13.24L3.34 16.07L1.93 14.66ZM1.93 3.34L3.34 1.93L6.17 4.76L4.76 6.17L1.93 3.34ZM5 10H0V8H5V10Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
