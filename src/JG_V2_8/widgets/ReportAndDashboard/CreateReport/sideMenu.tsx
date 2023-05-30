type SideMenuProps = {
  id: string
  title: string
}

const SideMenu = ({ id, title }: SideMenuProps) => {
  return (
    <>
      <input type="checkbox" id={id} className="peer hidden" />
      <label
        htmlFor={id}
        className="bg-gray-900 opacity-0 scale-0 peer-checked:scale-100 fixed flex justify-end w-full h-full top-0 left-0 peer-checked:opacity-60 z-10 "
      ></label>

      <div className="right-[-100%] overflow-y-auto w-[416px] h-full bg-white fixed top-0 peer-checked:right-0 z-20 transition-all">
        <div className="flex sticky top-0 z-50 bg-white border-b justify-between items-center p-4">
          <div className="">{title}</div>
          <label
            htmlFor={id}
            className=" w-7 h-7 bg-white rounded-full border border-gray-400 text-gray-500 cursor-pointer flex items-center justify-center"
          >
            <div className="fa fa-times"></div>
          </label>
        </div>
        <div className="">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-2 flex items-center pl-2">
              <div className="fa fa-search text-gray-400"></div>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-b border-slate-300  py-2 pl-9 pr-3 shadow-none focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search report category"
              type="text"
              name="search"
            />
          </label>
        </div>
        <div className="">
          <div className="border-b p-4 last:border-none cursor-pointer">Clubs</div>
          <div className="border-b p-4 last:border-none cursor-pointer">Clubs</div>
          <div className="border-b p-4 last:border-none cursor-pointer">Clubs</div>
          <div className="border-b p-4 last:border-none cursor-pointer">Clubs</div>
          {[
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 2,
          ].map(() => (
            <div className="border-b p-4 last:border-none cursor-pointer">Clubs</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SideMenu
