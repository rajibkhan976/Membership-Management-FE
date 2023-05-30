import { SVGProps } from '../SVGProps'

export default function Mobile({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `14`}
        height={height || `22`}
        viewBox="0 0 14 22"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M12 18H2V4H12V18ZM12 0H2C0.89 0 0 0.89 0 2V20C0 20.5304 0.210714 21.0391 0.585786 21.4142C0.960859 21.7893 1.46957 22 2 22H12C12.5304 22 13.0391 21.7893 13.4142 21.4142C13.7893 21.0391 14 20.5304 14 20V2C14 0.89 13.1 0 12 0Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
