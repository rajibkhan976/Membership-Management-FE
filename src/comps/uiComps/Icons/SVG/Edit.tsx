import { SVGProps } from '../SVGProps'

export default function Edit({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `24`}
        height={height || `24`}
        viewBox="0 0 24 24"
        className={className}
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.96979 19.0274H6.34865L14.8434 10.5205L13.4645 9.13973L4.96979 17.6466V19.0274ZM19.0538 9.09041L14.868 4.94795L16.2469 3.56712C16.6244 3.18904 17.0883 3 17.6385 3C18.1881 3 18.6516 3.18904 19.0292 3.56712L20.408 4.94795C20.7856 5.32603 20.9826 5.78236 20.999 6.31693C21.0154 6.85085 20.8348 7.30685 20.4573 7.68493L19.0538 9.09041ZM17.6257 10.5452L7.18581 21H3V16.8082L13.4399 6.35342L17.6257 10.5452Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
