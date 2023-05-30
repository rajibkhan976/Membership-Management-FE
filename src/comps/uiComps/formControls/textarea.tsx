type TextareaProps = {
  label: string
  id: string
  value: string
  name: string
  handleChange: any
  className?: string
}
const Textarea = ({ label, id, value, handleChange, name, className }: TextareaProps) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      placeholder={label}
      onChange={handleChange}
      className={`border text-[#455A64] text-[13px] leading-[16px] py-2 px-3 border-[#455A64] outline-none w-full min-h-[78px] ${className}`}
    />
  )
}

export default Textarea
