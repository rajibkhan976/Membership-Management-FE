import { XCircleIcon } from '@heroicons/react/outline'
import Modal from '@jg/common/comps/Modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftAngleIcon from '../Icons/SVG/LeftAngleIcon'
import TuneHorizontal from '../Icons/SVG/TuneHorizontal'
import DateFilterDropdown from './DateFilterDropdown'
import TagFilterDropdown from './TagFilterDropdown'

const EmailMbFilter = ({}: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false)
  const [isOpenTags, setIsOpenTags] = useState<boolean>(false)
  const navigate = useNavigate()
  const [search, setSearch] = useState<boolean>(false)
  const [showTagFilterOptions, setShowTagFilterOptions] = useState<boolean>(false)
  const [showDateFilterOptions, setShowDateFilterOptions] = useState<boolean>(false)

  const openModalHandler = () => {
    setIsOpen(!isOpen)
  }
  const openDateModalHandler = () => {
    setIsOpenDate(!isOpenDate)
  }
  const openTagsModalHandler = () => {
    setIsOpenTags(!isOpenTags)
  }

  return (
    <>
      <Modal
        open={false}
        setOpen={(isOpen) => {
          if (!isOpen) navigate(-1)
        }}
        titleSection={'<ModalTitle />'}
        bodySection={'Body'}
        showActionBtn={false}
      />
      <div className="">
        <div className="flex justify-end" onClick={openModalHandler}>
          <TuneHorizontal />
        </div>
        {isOpen && (
          <div className={`relative z-10`}>
            <div className="fixed inset-0 bg-[#263238] bg-opacity-75 transition-opacity" />
            <div className="fixed z-10 inset-0 overflow-y-visible">
              <div className="flex items-end justify-center min-h-full p-0 pt-8 sm:px-8 text-center">
                <div className="relative h-[90vh] w-full max-w-[1150px] bg-white rounded-t-3xl sm:rounded-t-xl text-left overflow-hidden shadow-xl transform transition-all sm:max-w-[1150px] divide-y divide-gray-100 translate-y-0 sm:scale-100">
                  <div className="w-full flex items-center justify-between p-4" style={{ minHeight: '3rem' }}>
                    <div className="">
                      <div className="text-[14px] text-jg-metal-700 font-bold">Filter</div>
                    </div>
                    <button onClick={openModalHandler} className="w-6 h-6 text-jg-grey-600">
                      <XCircleIcon />
                    </button>
                  </div>
                  <div className="bg-[#FAFAFA]">
                    <div className="border-b border-[#ECEFF1]">
                      <div
                        onClick={openDateModalHandler}
                        className="p-4 flex items-center justify-between hover:bg-[#ebeaea] transition-all duration-300"
                      >
                        <div className="">Date</div>
                        <div className="">
                          <LeftAngleIcon />
                        </div>
                      </div>
                      <div
                        onClick={openTagsModalHandler}
                        className="p-4 flex items-center justify-between hover:bg-[#ebeaea] transition-all duration-300"
                      >
                        <div className="">Tag</div>
                        <div className="">
                          <LeftAngleIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isOpenDate && (
          <div className={`relative z-20`}>
            <div className="fixed z-20 inset-0 overflow-y-visible">
              <div className="flex items-end justify-center min-h-full p-0 pt-8 sm:px-8 text-center">
                <div className="relative h-[90vh] w-full max-w-[1150px] bg-white rounded-t-3xl sm:rounded-t-xl text-left overflow-hidden shadow-xl transform transition-all sm:max-w-[1150px] divide-y divide-gray-100 translate-y-0 sm:scale-100">
                  <div
                    onClick={openDateModalHandler}
                    className="w-full flex gap-x-2 p-4 items-center"
                    style={{ minHeight: '3rem' }}
                  >
                    <button className="text-jg-metal-700">
                      <div className="rotate-180">
                        <LeftAngleIcon />
                      </div>
                    </button>
                    <div className="">
                      <div className="text-[14px] font-bold">Date</div>
                    </div>
                  </div>
                  <div className="border-t border-[#ECEFF1]">
                    <div className="h-[80vh] overflow-y-scroll">
                      <DateFilterDropdown
                        setSearch={setSearch}
                        setShowDateFilterOptions={setShowDateFilterOptions}
                        showDateFilterOptions={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isOpenTags && (
          <div className={`relative z-20`}>
            <div className="fixed z-20 inset-0 overflow-y-visible">
              <div className="flex items-end justify-center min-h-full p-0 pt-8 sm:px-8 text-center">
                <div className="relative h-[90vh] w-full max-w-[1150px] bg-white rounded-t-3xl sm:rounded-t-xl text-left overflow-hidden shadow-xl transform transition-all sm:max-w-[1150px] divide-y divide-gray-100 translate-y-0 sm:scale-100">
                  <div
                    onClick={openTagsModalHandler}
                    className="w-full flex gap-x-2 p-4 items-center"
                    style={{ minHeight: '3rem' }}
                  >
                    <button className="text-jg-metal-700">
                      <div className="rotate-180">
                        <LeftAngleIcon />
                      </div>
                    </button>
                    <div className="">
                      <div className="text-[14px] font-bold">Tags</div>
                    </div>
                  </div>
                  <div className="border-t border-[#ECEFF1]">
                    <div className="">
                      <TagFilterDropdown
                        setShowTagFilterOptions={setShowTagFilterOptions}
                        showTagFilterOptions={true}
                        setSearch={setSearch}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default EmailMbFilter
