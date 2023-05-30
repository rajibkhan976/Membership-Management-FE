import JustGoDropdown from '@comps/uiComps/Dropdown/JustGoSplitButton'
import { EmailEditOutline, ShapeOutline } from '@comps/uiComps/Icons'

const ReportList = () => {
  return (
    <div className="px-2 py-3.5 border-b last:border-none cursor-pointer">
      <div className="flex flex-col items-start md:flex-row justify-between pr-1">
        <div className="flex items-center">
          <div className="visible hidden md:block pr-0 md:pr-2 lg:pr-4 xl:pr-4">
            <div className="w-8 h-8 rounded-full border flex items-center justify-center bg-jg-grey-50 ">
              <ShapeOutline width={12.67} height={13.33} fill="#B0BEC5" />
            </div>
          </div>
          <div className="inline-block px-0 md:px-1">
            <h5 className="text-sm text-ellipsis overflow-hidden text-jg-metal-900">{'Subject Not Found!'}</h5>
            <div className="inline-block">
              <span className={'ml-1 text-xs text-jg-metal-700'}>Schedule </span>
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <JustGoDropdown
              options={[
                {
                  icon: <EmailEditOutline className="mr-2" />,
                  title: 'Edit',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportList
