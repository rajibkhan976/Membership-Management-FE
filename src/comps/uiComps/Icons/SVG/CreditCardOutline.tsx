import { SVGProps } from '../SVGProps'

export default function CreditCardOutline({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `20`}
        height={height || `16`}
        viewBox="0 0 20 16"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M18 4H2V2H18M18 14H2V8H18M18 0H2C0.89 0 0 0.89 0 2V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H18C18.5304 16 19.0391 15.7893 19.4142 15.4142C19.7893 15.0391 20 14.5304 20 14V2C20 0.89 19.1 0 18 0Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
