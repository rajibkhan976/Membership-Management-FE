import { SVGProps } from '../SVGProps'

export default function BookmarkOutline({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `14`}
        height={height || `18`}
        viewBox="0 0 14 18"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M12 15L7 12.82L2 15V2H12V15ZM12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18L7 15L14 18V2C14 0.89 13.1 0 12 0Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
