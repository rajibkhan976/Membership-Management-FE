import { SVGProps } from '../SVGProps'

export default function FileEditOutline({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `19`}
        height={height || `21`}
        viewBox="0 0 19 21"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M4 10H12V12H4V10ZM6 18H2V2H9V7H14V10.1L16 8.1V6L10 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H6V18ZM4 16H8.1L9 15.1V14H4V16ZM16.2 11C16.3 11 16.5 11.1 16.6 11.2L17.9 12.5C18.1 12.7 18.1 13.1 17.9 13.3L16.9 14.3L14.8 12.2L15.8 11.2C15.9 11.1 16 11 16.2 11ZM16.2 14.9L10.1 21H8V18.9L14.1 12.8L16.2 14.9Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
