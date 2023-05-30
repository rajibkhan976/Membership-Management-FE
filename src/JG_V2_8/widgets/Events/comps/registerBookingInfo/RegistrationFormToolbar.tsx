import { Button, Dropdown, DropdownItem } from '@comps/uiComps'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ClipboardListIcon } from '@heroicons/react/solid'

import { MemberType } from '@jg/common/types'

const CustomeDotBtn = () => {
  return (
    <Button
      as={'span'}
      text={''}
      btnSize="lg"
      className="px-2 bg-transparent hover:bg-white"
      btnColor="secondary"
      fillType="plain"
      icon={<DotsVerticalIcon />}
    />
  )
}
const RegistrationFormToolbar = ({
  titleComponent,
  index,
  member,
  hideCopyAction,
  onAction,
}: {
  index: number
  member: MemberType
  titleComponent: React.ReactNode
  hideCopyAction: boolean
  onAction: (action: 'copy' | 'clear') => void
}) => {
  // const { clear, copy } = useEntityExtGenericDataCaptureContext((state) => ({ clear: state.clear, copy: state.copy }))

  return (
    <div className="flex justify-between  bg-jg-grey-50 p-2.5 border border-l-0 border-t-0 border-r-0 border-jg-grey-200 text-jg-metal-500">
      <div>{titleComponent}</div>
      <div>
        {!hideCopyAction && (
          <Button
            fillType="outline"
            btnColor="secondary"
            btnSize="sm"
            icon={<ClipboardListIcon />}
            text={'Copy from previous'}
            className="mr-3"
            onClick={() => {
              onAction('copy')
            }}
          />
        )}
        <Dropdown
          onSelect={(value) => {
            // clear(member.DocId, index)
            onAction('clear')
          }}
          customButton={<CustomeDotBtn />}
        >
          {/*  <DropdownItem name="Copy from Default" value="copy" />
          <DropdownItem name="Set as Default" value="asDefault" />*/}
          <DropdownItem name="Clear form" value="clear" />
        </Dropdown>
      </div>
    </div>
  )
}
export default RegistrationFormToolbar
