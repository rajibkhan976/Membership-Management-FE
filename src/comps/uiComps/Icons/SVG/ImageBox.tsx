import { SVGProps } from '../SVGProps'

export default function ImageBox({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `24`}
        height={height || `24`}
        viewBox="0 0 24 24"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M8.88889 9.33333L11.1111 12L14.2222 8L18.2222 13.3333H5.77778L8.88889 9.33333ZM20 14.2222V1.77778C20 0.791111 19.2 0 18.2222 0H5.77778C5.30628 0 4.8541 0.187301 4.5207 0.520699C4.1873 0.854097 4 1.30628 4 1.77778V14.2222C4 14.6937 4.1873 15.1459 4.5207 15.4793C4.8541 15.8127 5.30628 16 5.77778 16H18.2222C18.6937 16 19.1459 15.8127 19.4793 15.4793C19.8127 15.1459 20 14.6937 20 14.2222Z"
          fill={fill || `currentColor`}
        />
        <path d="M20 18V19.7143H4V18H20ZM4 24H20V22.2857H4V24Z" fill={fill || `currentColor`} />
      </svg>
    </>
  )
}
