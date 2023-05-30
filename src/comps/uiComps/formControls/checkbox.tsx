import { FC } from 'react'

type InputProps = {
  label: string
  id: string
}
const Checkbox: FC<InputProps> = ({ label, id }) => {
  return (
    <>
      <label className="relative w-5 h-5  block cursor-pointer">
        <input
          id={id}
          type="checkbox"
          className="bg-transparent checked:after:content-['✓'] appearance-none border w-full h-full border-green-600 rounded cursor-pointer checked:ring-1 transition-all checked:border-2 checked:ring-offset-2 checked:bg-green-600 checked:text-white flex after:w-full after:h-full after:flex after:items-center after:justify-center after:font-bold after:duration-300 after:text-sm"
        />
      </label>
    </>
  )
}

export default Checkbox
