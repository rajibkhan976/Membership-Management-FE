import { SVGProps } from '../SVGProps'

export default function Download({ fill, height, width, className }: SVGProps) {
  return (
    <svg
      viewBox="0 0 14 12"
      width={width || `24`}
      height={height || `24`}
      fill={fill || `currentColor`}
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.333252 7H1.66659V10.3333H12.3333V7H13.6666V10.3333C13.6666 11.0733 13.0733 11.6667 12.3333 11.6667H1.66659C0.933252 11.6667 0.333252 11.0733 0.333252 10.3333V7ZM6.99992 9L10.6999 5.36L9.75325 4.42L7.66658 6.5V0.333336H6.33325V6.5L4.25325 4.42L3.30659 5.36667L6.99992 9Z"
        fill={fill || `currentColor`}
      />
    </svg>
  )
}
