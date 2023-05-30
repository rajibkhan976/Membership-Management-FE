import { SVGProps } from '../SVGProps'

export default function MonitorDashboard({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `22`}
        height={height || `20`}
        viewBox="0 0 22 20"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M20 14V2H2V14H20ZM20 0C20.5304 0 21.0391 0.210714 21.4142 0.585786C21.7893 0.960859 22 1.46957 22 2V14C22 14.5304 21.7893 15.0391 21.4142 15.4142C21.0391 15.7893 20.5304 16 20 16H13V18H15V20H7V18H9V16H2C0.89 16 0 15.1 0 14V2C0 0.89 0.89 0 2 0H20ZM4 4H13V9H4V4ZM14 4H18V6H14V4ZM18 7V12H14V7H18ZM4 10H8V12H4V10ZM9 10H13V12H9V10Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
