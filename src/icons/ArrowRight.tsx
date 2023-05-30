export default function ChevronRight({ active = true, className = '', ...rest }) {
  return (
    <div className={className} {...rest}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="16" fill={active ? '#008345' : '#ECEFF1'} />
        <path
          d="M12.5898 20.58L17.1698 16L12.5898 11.41L13.9998 10L19.9998 16L13.9998 22L12.5898 20.58Z"
          fill="white"
        />
      </svg>
    </div>
  )
}
