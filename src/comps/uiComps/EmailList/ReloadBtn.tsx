import { AiOutlineReload } from 'react-icons/ai'
import type { ReloadBtnProps } from './Interfaces'

const ReloadBtn = ({ ...props }: ReloadBtnProps) => {
  const { color = 'text-jg-grey-700 ', fontSize } = props
  return (
    <>
      <button className={`active:text-jg-green-500 ` + color} onClick={() => {}}>
        <AiOutlineReload className={`text-[23px] ` + fontSize} />
      </button>
    </>
  )
}
export default ReloadBtn
