export type InputFieldProps = {
  label?: string
  children?: any
  className?: string
  a: string
  inputItems?: { label: string; value: string }[]
  orientation?: 'horizontal' | 'vertical' | 'left' | 'right' | 'top' | 'bottom' | 'left' | 'right' | 'top'
  visibility?: boolean
  horizontalSpace?: number
  rounded?: number
}
const InputField = (props: InputFieldProps) => {
  const {
    label,
    children,
    className,
    a,
    inputItems,
    orientation = 'horizontal',
    visibility,
    horizontalSpace,
    rounded,
  } = props
  return (
    <div
      className={`border p-4 ${rounded ? `rounded-${rounded}` : 'rounded'} ${className}`}
      style={{ borderRadius: rounded }}
    >
      <p className={`${a}`}>{label}</p>
      <span>{children}</span>
      <input />
      <ul>
        {inputItems &&
          inputItems.map((item, index) => (
            <>
              <li key={index}>{item.label}</li>
              <li>{item.value}</li>
            </>
          ))}
      </ul>
      <div
        className={`p-10 flex ${visibility === true ? '' : 'hidden'} ${
          orientation === 'horizontal' ? 'flex-row' : 'flex-col'
        }  gap-y-${horizontalSpace}`}
      >
        <p>I am first child</p>
        <p>I am second child</p>
      </div>
    </div>
  )
}

export default InputField
