type InputProps = {
  label?: string
  icon?: JSX.Element
  value?: number
  handleChange?: any
  className?: string
  fieldType?: 'number' | 'currency'
}

const NumberInput = ({ value, label, handleChange, icon, className, fieldType = 'number' }: InputProps) => {
  return (
    <>
      <div className={`align-middle flex items-center flex-row relative border ${className}`}>
        <label htmlFor="number-field" className="flex justify-center mb-0 ">
          {icon}
        </label>
        <input
          type="number"
          id=""
          placeholder={label}
          name="number-field"
          className="w-full mr-4 outline-none bg-white text-sm font-medium text-gray-700 p-1.5"
          value={value}
          onChange={
            fieldType === 'number'
              ? (e) => handleChange(e.target.value.replace(/[^0-9]/g, ''))
              : (e) => handleChange(e.target.value)
          }
        />
      </div>
    </>
  )
}

export default NumberInput
