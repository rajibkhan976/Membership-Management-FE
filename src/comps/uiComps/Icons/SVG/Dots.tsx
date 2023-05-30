import { SVGProps } from '../SVGProps'

export default function Dots({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `16`}
        height={height || `16`}
        viewBox="0 0 16 16" 
        className={className}
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.66675 3.33333C6.66675 2.59695 7.2637 2 8.00008 2C8.73646 2 9.33341 2.59695 9.33341 3.33333C9.33341 4.06971 8.73646 4.66667 8.00008 4.66667C7.2637 4.66667 6.66675 4.06971 6.66675 3.33333ZM6.66675 8C6.66675 7.26362 7.2637 6.66667 8.00008 6.66667C8.73646 6.66667 9.33341 7.26362 9.33341 8C9.33341 8.73638 8.73646 9.33333 8.00008 9.33333C7.2637 9.33333 6.66675 8.73638 6.66675 8ZM6.66675 12.6667C6.66675 11.9303 7.2637 11.3333 8.00008 11.3333C8.73646 11.3333 9.33341 11.9303 9.33341 12.6667C9.33341 13.403 8.73646 14 8.00008 14C7.2637 14 6.66675 13.403 6.66675 12.6667Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
