import { SVGProps } from '../SVGProps'

export default function EmailOpen({ fill, height, width, className }: SVGProps) {
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
          d="M2 8.00001L10 13L18 8.00001L10 3.00001L2 8.00001ZM20 8.00001V18C20 18.5304 19.7893 19.0392 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0392 0 18.5304 0 18V8.00001C0 7.27001 0.39 6.64001 0.97 6.29001L10 0.640015L19.03 6.29001C19.61 6.64001 20 7.27001 20 8.00001Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
