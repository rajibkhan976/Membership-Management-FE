import { SVGProps } from '../SVGProps'

export default function CsvOutline({ fill, height, width, className }: SVGProps) {
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
          d="M10 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V6L10 0ZM14 18H2V2H9V7H14V18ZM6 11H3V9H6V11ZM10 11H7V9H10V11ZM6 14H3V12H6V14ZM10 14H7V12H10V14ZM6 17H3V15H6V17ZM10 17H7V15H10V17Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
