import { FC } from 'react'

type InputProps = {
  label: string
  id: string
}
const Radio: FC<InputProps> = ({ label, id }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type={'radio'}
          id={id}
          name={'new'}
          checked={true}
          className="bg-transparent appearance-none w-5 h-5 border border-green-600 rounded-full cursor-pointer checked:ring-1 transition-all checked:border-[5px] checked:ring-offset-2 checked:bg-green-100"
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  )
}

export default Radio
