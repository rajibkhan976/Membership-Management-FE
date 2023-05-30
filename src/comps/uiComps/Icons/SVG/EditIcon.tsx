import { SVGProps } from '../SVGProps'

export default function EditIcon({ fill, height, width, className }: SVGProps) {
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
          d="M12.4327 8.58667L8.38607 12.6267V14H9.7594L13.7994 9.95333M14.8527 8.38667L13.9994 7.53333C13.9327 7.46 13.8394 7.42 13.7461 7.42C13.6461 7.42667 13.5527 7.46 13.4861 7.53333L12.8194 8.2L14.1861 9.53333L14.8527 8.86667C14.9794 8.73333 14.9794 8.52 14.8527 8.38667ZM7.05273 11.3333H2.38607V4.66667L7.7194 8L13.0527 4.66667V6H14.3861V3.33333C14.3861 2.6 13.7861 2 13.0527 2H2.38607C1.65273 2 1.05273 2.6 1.05273 3.33333V11.3333C1.05273 12.0667 1.65273 12.6667 2.38607 12.6667H7.05273V11.3333ZM13.0527 3.33333L7.7194 6.66667L2.38607 3.33333H13.0527Z"
          fill={fill || `currentColor`}
        />
      </svg>
    </>
  )
}
