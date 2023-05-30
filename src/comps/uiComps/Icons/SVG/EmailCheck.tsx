import { SVGProps } from '../SVGProps'

export default function EmailCheck({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `23`}
        height={height || `18`}
        viewBox="0 0 23 18"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M20 9.34C19.37 9.12 18.7 9 18 9C16.4087 9 14.8826 9.63214 13.7574 10.7574C12.6321 11.8826 12 13.4087 12 15C12 15.34 12.03 15.67 12.08 16H2C1.46957 16 0.960859 15.7893 0.585786 15.4142C0.210714 15.0391 0 14.5304 0 14V2C0 0.89 0.89 0 2 0H18C18.5304 0 19.0391 0.210714 19.4142 0.585786C19.7893 0.960859 20 1.46957 20 2V9.34ZM22.5 13L17.5 18L14 14.5L15.5 13L17.5 15L21 11.5L22.5 13ZM2 2V4L10 9L18 4V2L10 7L2 2Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
