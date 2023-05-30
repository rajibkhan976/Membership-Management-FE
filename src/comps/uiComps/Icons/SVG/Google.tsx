import { SVGProps } from '../SVGProps'

export default function Google({ fill, height, width, className }: SVGProps) {
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
          d="M19.3498 9.1H10.1798V11.83H16.6898C16.3598 15.64 13.1898 17.27 10.1898 17.27C6.35979 17.27 2.99979 14.25 2.99979 10C2.99979 5.9 6.19979 2.73 10.1998 2.73C13.2898 2.73 15.0998 4.7 15.0998 4.7L16.9998 2.72C16.9998 2.72 14.5598 0 10.0998 0C4.41979 0 0.0297852 4.8 0.0297852 10C0.0297852 15.05 4.15979 20 10.2498 20C15.5998 20 19.4998 16.33 19.4998 10.91C19.4998 9.76 19.3498 9.1 19.3498 9.1Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
