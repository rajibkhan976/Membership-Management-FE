import TextArea from '@comps/uiComps/forms/TextArea/TextArea'
import SideMenu from './sideMenu'

const CreateReport = () => {
  return (
        <div className="flex justify-between">
          <div className="w-1/4 border-r ">
            <div className="border-b bg-gray-100">
              <div className="p-3 items-center flex justify-between">
                <div className="">General</div>
                <div className=" opacity-0 pointer-events-none">
                  <button
                    type="button"
                    className="flex space-x-2 border border-green-400 py-1 bg-green-50 transition-all text-green-500 hover:text-white hover:bg-green-400  px-5"
                  >
                    <span className="inline-block">+</span>
                    <span className="inline-block">Add</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="pb-10">
              <form>
                <div className="">
                  <div className="p-3">
                    <label className="block">
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Name
                      </span>
                      <input
                        type="name"
                        name="name"
                        className="mt-1 px-3 py-2 h-8 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Write report name"
                      />
                    </label>
                  </div>
                  <div className="p-3">
                    <label className="block" htmlFor="selectCategory">
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Category
                      </span>
                      <select className="pointer-events-none mt-1 px-3 py-2 cursor-pointer bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                        <option value="" className="cursor-pointer">
                          Select report category
                        </option>
                      </select>
                    </label>
                    <SideMenu id="selectCategory" title="Select Report Category (17)" />
                  </div>
                  <div className="p-3">
                    <label className="block">
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Type
                      </span>
                      <select className="mt-1 px-3 py-2  bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                        <option value="">User</option>
                      </select>
                    </label>
                  </div>
                  <div className="p-3">
                    <label className="block">
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Group
                      </span>
                      <select className="mt-1 px-3 py-2  bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
                        <option value="">Select report group</option>
                      </select>
                    </label>
                  </div>
                  <div className="p-3">
                    <label className="block" htmlFor="path">
                      <span className="block text-sm font-medium text-slate-700">Path</span>
                      <input
                        type="name"
                        name="name"
                        className="mt-1 px-3 py-2 h-8 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Write the report path"
                      />
                    </label>
                    <SideMenu id="path" title="path" />
                  </div>
                  <div className="p-3">
                    <label className="block">
                      <TextArea
                        label="Description"
                        name="name"
                        className="mt-1 px-3 py-2 h-20 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Write a report short description"
                      />
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-2/4 border-r ">
            <div className=" border-b bg-gray-100">
              <div className="p-3 flex justify-between items-center">
                <div className="">Report Parameters</div>
                <div className="flex items-center space-x-4">
                  <div className="peer-checked:hidden">
                    <div className="fa fa-trash text-red-500 text-xl"></div>
                  </div>
                  <label
                    htmlFor="add"
                    className="flex space-x-2 border border-green-400 py-1 bg-green-50 transition-all text-green-500 hover:text-white hover:bg-green-400  px-5"
                  >
                    <span className="inline-block">+</span>
                    <span className="inline-block">Add</span>
                  </label>
                  <SideMenu id="add" title="add Button" />
                </div>
              </div>
            </div>
            <div className="">
              <div className="font-medium flex items-center py-2 border-b last:border-none">
                <div className="px-5 flex">
                  <input
                    type="checkbox"
                    className="appearance-none peer w-4 h-4 border-[3px] border-gray-50  ring-1 ring-gray-400 cursor-pointer rounded-sm checked:bg-gray-700"
                  />
                </div>
                <div className="w-20">Code</div>
                <div className="">Label Name</div>
                <div className="ml-auto w-32">Type</div>
                <div className="pr-4 text-right w-32">Default Value</div>
              </div>
              {[1, 1, 1, 1, 1].map(() => (
                <div className="font-normal flex items-center py-2 border-b last:border-none text-gray-500">
                  <div className="px-5 flex">
                    <input
                      type="checkbox"
                      className="appearance-none w-4 h-4 border-[3px] border-gray-50  ring-1 ring-gray-400 cursor-pointer rounded-sm checked:bg-gray-700"
                    />
                  </div>
                  <div className="w-20">0001</div>
                  <div className="">First Name</div>
                  <div className="ml-auto w-32 text-left">Text</div>
                  <div className="pr-4 text-right w-32">1</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/4 border-r">
            <div className="border-b bg-gray-100">
              <div className="p-3 items-center flex justify-between">
                <div className="">General</div>
                <div className="">
                  <button
                    type="button"
                    className="flex space-x-2 border border-green-400 py-1 bg-green-50 transition-all text-green-500 hover:text-white hover:bg-green-400  px-5"
                  >
                    <span className="inline-block">+</span>
                    <span className="inline-block">Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default CreateReport
