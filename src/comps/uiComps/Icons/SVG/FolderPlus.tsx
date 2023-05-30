import { SVGProps } from '../SVGProps'

export default function FolderPlus({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `21`}
        height={height || `19`}
        viewBox="0 0 21 19"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M11 15C11 15.34 11.04 15.67 11.09 16H2C0.9 16 0 15.11 0 14V2C0 0.89 0.89 0 2 0H8L10 2H18C19.1 2 20 2.89 20 4V9.81C19.12 9.3 18.1 9 17 9C13.69 9 11 11.69 11 15ZM18 14V11H16V14H13V16H16V19H18V16H21V14H18Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
