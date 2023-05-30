import { ReactComponent as ResetIcon } from '@jg/assets/images/ResetIcon.svg'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Button from '@comps/uiComps/Button/Button'
import { useWidgetContext } from 'jg-widget'
import { useNavigate, useParams } from 'react-router-dom'
import type { ModalBodyProps } from '../interfaces/interfaces'

const ModalBody = ({ headerTitle, bodyHeaderBtnTxt, bodyHeaderBtnIcon, bodyContent, setOpenModal }: ModalBodyProps) => {
  const navigate = useNavigate()
  const { basePath } = useWidgetContext()
  const { clubDocId } = useParams()

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col md:flex-row border-b">
        <div className="w-full md:w-8/12 flex items-center pl-2 text-jg-grey-700 font-semibold ml-2 md:ml-0">
          <p className={'mt-4 mb-4'}>{headerTitle}</p>
        </div>
        <div className="w-full md:w-4/12 flex md:justify-end mt-2 md:mt-0 ml-4 md:ml-0 mr-4">
          <div className="flex items-center justify-center cursor-pointer">
            <ResetIcon />
          </div>
          <div className="flex items-center justify-center text-jg-grey-500 text-sm ml-4">
            1-2 of <span className="text-jg-grey-700 ml-1">2</span>
          </div>
          <div className="flex items-center justify-center text-jg-grey-500 text-sm ml-4">
            <ChevronLeftIcon className="w4 h-4 text-jg-grey-400 cursor-pointer" />
            <ChevronRightIcon className="w4 h-4 text-jg-grey-400 ml-2 cursor-pointer" />
          </div>
          <div className="ml-4 my-auto">
            <Button
              btnColor="primary"
              btnSize="md"
              fillType="solid"
              icon={bodyHeaderBtnIcon}
              iconPosition="left"
              onClick={() => {
                bodyHeaderBtnTxt === 'Create Segment'
                  ? navigate(`${basePath}${clubDocId}/create-segment`)
                  : setOpenModal(false)
              }}
              text={bodyHeaderBtnTxt}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col">{bodyContent}</div>
    </div>
  )
}

export default ModalBody
