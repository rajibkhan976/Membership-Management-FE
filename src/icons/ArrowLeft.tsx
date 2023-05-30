export default function ArrowLeft({ active = true, className = '', ...rest }) {
  return (
    <div className={className} {...rest}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="16" fill={active ? '#008345' : '#ECEFF1'} />
        <path d="M19.41 20.58L14.83 16L19.41 11.41L18 10L12 16L18 22L19.41 20.58Z" fill="#CFD8DC" />
      </svg>
    </div>
  )
}
