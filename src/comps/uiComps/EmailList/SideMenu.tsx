import CloseIcon from '../Icons/SVG/closeIcon'

type SideMenuProps = {
  id: string
  title: string
  body: React.ReactNode
}

const SideMenu = ({ id, title, body }: SideMenuProps) => {
  return (
    <>
      {/* <>
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
              className=" w-7 h-7 bg-white rounded-full border border-gray-400 text-gray-500 cursor-pointer flex items-center justify-center"
            >
              <div className="fa fa-times"></div>
            </label>
          </div>
          <div className="">{body}</div>
        </div>
      </> */}
      <>
        <input type="checkbox" id={id} className="peer hidden" />
        <label className="bg-gray-900 opacity-0 scale-0 peer-checked:scale-100 fixed flex justify-end w-full h-full top-0 left-0 peer-checked:opacity-60 z-10 "></label>

        <div className="right-[-100%] overflow-y-auto w-full max-w-[416px] h-full bg-white fixed top-0 peer-checked:right-0 z-20 transition-all">
          <div
            style={{
              background: `linear-gradient(0deg, #FAFAFA, #FAFAFA), linear-gradient(0deg, #ECEFF1, #ECEFF1)`,
            }}
            className="flex sticky top-0 z-50 bg-white border-b justify-between items-center p-4"
          >
            <div className="text-sm font-semibold">{title}</div>
            <label htmlFor={id} className=" w-6 h-6 cursor-pointer flex items-center justify-center">
              <CloseIcon />
            </label>
          </div>
          <div
            className=""
            style={{
              minHeight: 'calc(100vh - 115px)',
            }}
          >
            <div className="p-4">
              <div className="py-4">
                {[1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1].map(() => (
                  <div className="inline-block mr-2 mb-3">
                    <div className="flex gap-1 border border-jg-metal-500 rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize">
                      asd
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default SideMenu
