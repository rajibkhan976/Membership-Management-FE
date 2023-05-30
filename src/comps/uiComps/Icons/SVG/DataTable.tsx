import { SVGProps } from '../SVGProps'

export default function DataTable({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `20`}
        height={height || `19`}
        viewBox="0 0 20 19"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M2 0H18C18.5304 0 19.0391 0.210714 19.4142 0.585786C19.7893 0.960859 20 1.46957 20 2V17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H2C1.46957 19 0.960859 18.7893 0.585786 18.4142C0.210714 18.0391 0 17.5304 0 17V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0ZM2 4V7H6V4H2ZM8 4V7H12V4H8ZM18 7V4H14V7H18ZM2 9V12H6V9H2ZM2 17H6V14H2V17ZM8 9V12H12V9H8ZM8 17H12V14H8V17ZM18 17V14H14V17H18ZM18 9H14V12H18V9Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
