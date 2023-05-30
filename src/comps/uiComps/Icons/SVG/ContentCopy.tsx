import { SVGProps } from '../SVGProps'

export default function ContentCopy({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `19`}
        height={height || `22`}
        viewBox="0 0 19 22"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M17 20H6V6H17V20ZM17 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6C19 5.46957 18.7893 4.96086 18.4142 4.58579C18.0391 4.21071 17.5304 4 17 4ZM14 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16H2V2H14V0Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
