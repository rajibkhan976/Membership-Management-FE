import CloseIcon from "@comps/uiComps/Icons/SVG/closeIcon"

type SideMenuProps = {
  id: string
  title: string
  children: JSX.Element
}

const SideMenu = ({ id, title,children }: SideMenuProps) => {
  return (
    <>
      <input type="checkbox" id={id} className="peer hidden" />
      <label
        htmlFor={id}
        className="bg-gray-900 opacity-0 scale-0 peer-checked:scale-100 fixed flex justify-end w-full h-full top-0 left-0 peer-checked:opacity-60 z-10 "
      ></label>

      <div className="right-[-100%] overflow-y-auto w-full max-w-[416px] h-full bg-white fixed top-0 peer-checked:right-0 z-20 transition-all">
        <div className="flex sticky top-0 z-50 bg-white border-b justify-between items-center p-4">
          <div className="">{title}</div>
          <label
            htmlFor={id}
            className=" w-6 h-6 cursor-pointer flex items-center justify-center"
          >
            <CloseIcon /> 
          </label>
        </div>
        <div className="">
          {children}
        </div>
      </div>
    </>
  )
}

export default SideMenu
