import { SVGProps } from '../SVGProps'

export default function Image({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `18`}
        height={height || `18`}
        viewBox="0 0 18 18"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M5.5 10.5L8 13.5L11.5 9L16 15H2L5.5 10.5ZM18 16V2C18 0.89 17.1 0 16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
