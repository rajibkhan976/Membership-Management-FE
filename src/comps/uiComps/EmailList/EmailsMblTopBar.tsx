import { Search } from '@comps/uiComps/Icons/index'
import type { EmailLeftBarProps } from '@jg/widgets/EmailAndCom/interfaces/interfaces'
import { memo } from 'react'
import EmailListBox from './EmailListBox'
import EmailMbFilter from './EmailMbFilter'

const EmailsMblTopBar = ({ items, sideMenuFilter, onchange, value, refresh, selected }: EmailLeftBarProps) => {
  const debounce = (fn: Function, delay: number) => {}

  return (
    <div className="relative block lg:hidden lg:visible border-b">
      <div className="flex flex-row justify-between items-center h-12">
        <div className="w-full ">
          <EmailListBox selected={selected} handleChange={sideMenuFilter} items={items} />
        </div>
      </div>
      <div className="sm:h-12 h-auto px-2 flex items-center gap-2 sm:w-full w-full sm:py-0 text-jg-metal-300">
        <div className="w-[10%]">
          <Search />
        </div>
        <input
          type="text"
          placeholder="Search all email"
          onChange={(e: any) => {
            if (e.target.value.length >= 3) {
              onchange(e.target.value)
            }
          }}
          value={value}
          className="h-9 w-[95%] focus:outline-none "
        />
        <div className="w-[10%] text-jg-metal-700">
          {/* <SettingsVertical /> */}
          <EmailMbFilter />
        </div>
      </div>
    </div>
  )
}

export default memo(EmailsMblTopBar)
