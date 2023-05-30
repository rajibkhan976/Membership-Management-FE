import { SVGProps } from '../SVGProps'

export default function PreviewIcon({ fill, height, width, className }: SVGProps) {
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
          d="M7.99984 11C8.83317 11 9.54161 10.7084 10.1252 10.1253C10.7083 9.54178 10.9998 8.83333 10.9998 8C10.9998 7.16667 10.7083 6.45822 10.1252 5.87467C9.54161 5.29156 8.83317 5 7.99984 5C7.1665 5 6.45806 5.29156 5.8745 5.87467C5.29139 6.45822 4.99984 7.16667 4.99984 8C4.99984 8.83333 5.29139 9.54178 5.8745 10.1253C6.45806 10.7084 7.1665 11 7.99984 11ZM7.99984 9.8C7.49984 9.8 7.07495 9.62489 6.72517 9.27467C6.37495 8.92489 6.19984 8.5 6.19984 8C6.19984 7.5 6.37495 7.07489 6.72517 6.72467C7.07495 6.37489 7.49984 6.2 7.99984 6.2C8.49984 6.2 8.92495 6.37489 9.27517 6.72467C9.62495 7.07489 9.79984 7.5 9.79984 8C9.79984 8.5 9.62495 8.92489 9.27517 9.27467C8.92495 9.62489 8.49984 9.8 7.99984 9.8ZM7.99984 13C6.37761 13 4.89984 12.5471 3.5665 11.6413C2.23317 10.736 1.2665 9.52222 0.666504 8C1.2665 6.47778 2.23317 5.26378 3.5665 4.358C4.89984 3.45267 6.37761 3 7.99984 3C9.62206 3 11.0998 3.45267 12.4332 4.358C13.7665 5.26378 14.7332 6.47778 15.3332 8C14.7332 9.52222 13.7665 10.736 12.4332 11.6413C11.0998 12.5471 9.62206 13 7.99984 13ZM7.99984 11.6667C9.25539 11.6667 10.4083 11.336 11.4585 10.6747C12.5083 10.0138 13.3109 9.12222 13.8665 8C13.3109 6.87778 12.5083 5.986 11.4585 5.32467C10.4083 4.66378 9.25539 4.33333 7.99984 4.33333C6.74428 4.33333 5.59139 4.66378 4.54117 5.32467C3.49139 5.986 2.68873 6.87778 2.13317 8C2.68873 9.12222 3.49139 10.0138 4.54117 10.6747C5.59139 11.336 6.74428 11.6667 7.99984 11.6667Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
