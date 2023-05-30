import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReportList from './reportList'
import { useWidgetContext } from 'jg-widget'

const Accodian = () => {
  const { clubDocId } = useParams()
  const { basePath } = useWidgetContext()
  const [selected, setSelected] = useState<number>(0)

  console.log(clubDocId)

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between">
          <div className="flex space-x-5 items-center">
            <div className="">
              <input type="text" placeholder="Search Report" className="border px-3 h-8 shadow-none outline-none" />
            </div>
            <div className="">
              <div className="flex border items-center">
                <div className="h-8 flex items-center px-5 cursor-pointer border-r bg-green-600 text-white">All</div>
                <div className="h-8 flex items-center px-5 hover:bg-green-600 hover:text-white cursor-pointer border-r">
                  Standard
                </div>
                <div className="h-8 flex hover:bg-green-600 hover:text-white  items-center px-5 cursor-pointer">
                  Customer
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 items-center">
            <div className="text-base cursor-pointer">
              <div className="fa fa-repeat"></div>
            </div>
            <Link to={`${basePath}${clubDocId}/create-report`} className="inline-block cursor-pointer">
              <div className="h-8 flex items-center px-5 cursor-pointer  bg-green-600 text-white hover:bg-green-700">
                New Report
              </div>
            </Link>
            <div className="h-8 flex items-center px-5 cursor-pointer  bg-green-600 text-white hover:bg-green-700">
              Add Category
            </div>
          </div>
        </div>
      </div>
      <div className="border">
        <div className="">
          {[1, 1, 1, 1, 1, 1].map((item, i: number) => (
            <div key={i} className="">
              <input
                type="radio"
                name="accrodion"
                onClick={() => setSelected(i)}
                checked={i === selected}
                className="peer hidden"
                id={`item_${i}`}
              />
              <label
                htmlFor={`item_${i}`}
                className="cHeader border-b last:border-none  cursor-pointer flex justify-between bg-gray-50 px-4 py-2 "
              >
                <div className="flex items-center space-x-2">
                  <div className="relative w-4 h-full flex items-center justify-center">
                    <div className="absolute border-t-4 border-l-4 border-r-4 w-0 h-0 border-r-transparent border-l-transparent border-t-gray-700"></div>
                  </div>
                  <div className="">Cluls ({i + 1})</div>
                </div>
                <div className="relative group">
                  <div className=" w-4 h-4  felx items-center justify-items-center cursor-pointer">...</div>
                  <div className="opacity-0 group-hover:opacity-100 hidden absolute top-7 right-0">
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
                <div className="px-3">
                  {[...Array(4)].map((item, i) => (
                    <ReportList key={i} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Accodian
