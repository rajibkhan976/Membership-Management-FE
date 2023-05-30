import { SVGProps } from '../SVGProps'

export default function DetailsIcon1({ fill, height, width, className }: SVGProps) {
  return (
    <>  
      <svg 
        width={width ?? '16'}
        height={height ?? '16'}
        viewBox="0 0 16 16"
        fill={fill ?? `currentColor`}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      ><path
          d="M9.33333 11.3333H4.66667V10H9.33333M11.3333 8.66667H4.66667V7.33333H11.3333M11.3333 6H4.66667V4.66667H11.3333M12.6667 2H3.33333C2.59333 2 2 2.59333 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V3.33333C14 2.59333 13.4 2 12.6667 2Z"
          fill={fill ?? `currentColor`}
        />
      </svg>
    </>
  )
}
