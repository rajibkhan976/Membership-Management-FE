import { SVGProps } from '../SVGProps'

export default function IconBox({ fill, height, width, className }: SVGProps) {
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
        <path d="M20 18V19.7143H4V18H20ZM4 24H20V22.2857H4V24Z" fill={fill || `currentColor`} />
        <path
          d="M12 16L10.84 14.849C6.72 10.7771 4 8.08283 4 4.79564C4 2.10136 5.936 0 8.4 0C9.792 0 11.128 0.706267 12 1.81362C12.872 0.706267 14.208 0 15.6 0C18.064 0 20 2.10136 20 4.79564C20 8.08283 17.28 10.7771 13.16 14.849L12 16Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
