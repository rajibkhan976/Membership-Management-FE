const ReportList = () => {
  return (
    <>
      <div className="border">
        <div className="">
          {[1, 1, 1, 1, 1, 1].map((item, i: number) => (
            <div key={i} className="overflow-hidden">
              <input type="radio" name="accrodion" className="peer hidden" id={`item_${i}`} />
              <label
                htmlFor={`item_${i}`}
                className="cHeader border-b  cursor-pointer flex justify-between bg-gray-50 px-4 py-2 "
              >
                <div className="flex items-center space-x-2">
                  <div className="relative w-4 h-full flex items-center justify-center">
                    <div className="absolute border-t-4 border-l-4 border-r-4 w-0 h-0 border-r-transparent border-l-transparent border-t-gray-700"></div>
                  </div>
                  <div className="">Cluls ({i + 1})</div>
                </div>
                <div className="relative group">
                  <div className=" w-4 h-4  felx items-center justify-items-center cursor-pointer">...</div>
                  <div className="opacity-0 group-hover:opacity-100 absolute top-7 right-0">
                    <div className="border bg-white px-3 py-2 cursor-pointer rounded shadow-lg w-36">
                      <div className="flex items-center space-x-2 py-1">
                        <div className="fa fa-pencil"></div>
                        <div className=""> Edit</div>
                      </div>
                      <div className="flex items-center space-x-2 py-1 cursor-pointer">
                        <div className="fa fa-trash"></div>
                        <div className=""> Delete</div>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <div className="cBody opacity-0 max-h-0 peer-checked:max-h-screen peer-checked:opacity-100">
                <div className="p-3">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ratione laudantium vel fuga libero
                    odio minus beatae dolores soluta vero!
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ReportList
