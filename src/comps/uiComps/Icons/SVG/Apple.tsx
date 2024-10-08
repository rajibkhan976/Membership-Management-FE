import { SVGProps } from '../SVGProps'

export default function Apple({ fill, height, width, className }: SVGProps) {
  return (
    <>
      <svg
        width={width || `18`}
        height={height || `21`}
        viewBox="0 0 18 21"
        fill={fill || `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M15.7098 17.5C14.8798 18.74 13.9998 19.95 12.6598 19.97C11.3198 20 10.8898 19.18 9.36985 19.18C7.83985 19.18 7.36985 19.95 6.09985 20C4.78985 20.05 3.79985 18.68 2.95985 17.47C1.24985 15 -0.0601522 10.45 1.69985 7.39C2.56985 5.87 4.12985 4.91 5.81985 4.88C7.09985 4.86 8.31985 5.75 9.10985 5.75C9.88985 5.75 11.3698 4.68 12.9198 4.84C13.5698 4.87 15.3898 5.1 16.5598 6.82C16.4698 6.88 14.3898 8.1 14.4098 10.63C14.4398 13.65 17.0598 14.66 17.0898 14.67C17.0598 14.74 16.6698 16.11 15.7098 17.5ZM9.99985 1.5C10.7298 0.67 11.9398 0.04 12.9398 0C13.0698 1.17 12.5998 2.35 11.8998 3.19C11.2098 4.04 10.0698 4.7 8.94985 4.61C8.79985 3.46 9.35985 2.26 9.99985 1.5Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
