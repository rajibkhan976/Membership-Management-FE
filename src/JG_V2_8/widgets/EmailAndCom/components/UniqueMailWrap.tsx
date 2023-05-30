import HashTagSuggestion from '@comps/uiComps/EmailList/HashTagSuggestion'
import CloseIcon from '@comps/uiComps/Icons/SVG/closeIcon'
import { useState } from 'react'
import SideMenu from './sideMenu'

type UniqueMailWrapProps = {
    addHashTag: any
    emailBody: any
}
const UniqueMailWrap = ({addHashTag,emailBody}:UniqueMailWrapProps) => {
  const [uniqueEmail, setUniqueEmail] = useState(false)
  const [excludeUnder16, setExcludeUnder16] = useState(false)
  const [newTag, setNewTag] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [hash, setHash] = useState<boolean>(false)
  

  const handleAddTags = () => {
    setTags([...tags, newTag])
    console.log(tags)
    setNewTag('')
  }

  const deleteTag = (item: string) => {
    const newArray = tags.filter((tag: string) => tag !== item)
    setTags(newArray)
  }

  return (
    <>
      <div className="bg-[#FAFAFA] grid md:grid-cols-4 grid-cols-1">
        <div className="border-r flex p-4 items-center justify-between md:border-b-0 border-b">
          <div className="text-[13px] text-[#607D8B] leading-4">Unique Email Only</div>
          <div className="flex">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={uniqueEmail}
                onChange={(e) => setUniqueEmail(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-jg-green-600"></div>
            </label>
          </div>
        </div>

        <div className="border-r flex p-4 items-center justify-between md:border-b-0 border-b">
          <div className="text-[13px] text-[#607D8B] leading-4">Excl. Members Under 16</div>
          <div className="flex">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={excludeUnder16}
                onChange={(e) => setExcludeUnder16(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-jg-green-600"></div>
            </label>
          </div>
        </div>

        <div className="broder-r md:col-span-2 p-4 md:flex gap-x-4">
          <div className="mb-2">
            <label htmlFor="addTags">
              <span className="text-jg-green-500 cursor-pointer font-medium"> Add Tags</span>
            </label>
            <SideMenu id={'addTags'} title={'Add tags'}>
              <>
                <div className="p-4 flex gap-x-4 items-center">
                  <input
                    type="text"
                    value={newTag}
                    placeholder="Enter your tag name"
                    className="border px-3 p-2 placeholder-jg-metal-300 text-jg-metal-700 shadow-none focus:outline-none w-full"
                    onChange={(e: any) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTags()
                      }
                    }}
                  />
                  <button
                    className="jg-btn disabled:bg-jg-metal-50 disabled:cursor-not-allowed disabled:text-jg-metal-200 cursor-pointer h-[42px] min-w-[90px] text-left jg-btn-solid-primary jg-btn-lg rounded-sm items-center"
                    disabled={newTag === ''}
                    onClick={handleAddTags}
                  >
                    Add Tag
                  </button>
                </div>

                <div className="px-4">
                  {tags.map((item, r) => (
                    <div key={r} className="inline-block mr-2 mb-3">
                      <div className="flex gap-1 border border-jg-metal-500 rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500">
                        <div className="">{item}</div>
                        <div className="" onClick={() => deleteTag(item)}>
                          <CloseIcon width={16} height={16} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No tag found */}
                {/* <div className="h-72 flex items-center justify-center">
                    <div className="text-jg-metal-200">No Recent Tags Found</div>
                  </div> */}
                {/* No tag found */}
              </>
            </SideMenu>
          </div>
          <div className="">
            {tags.slice(0, 3).map((item, r) => (
              <div key={r} className="inline-block mr-2 mb-3">
                <div className="flex gap-1 border border-jg-metal-500 rounded-full items-center px-2 cursor-pointer text-[13px] text-jg-metal-500">
                  <div className="">{item}</div>
                </div>
              </div>
            ))}
            {tags && tags.length > 3 && (
              <div className="inline-block mr-2 mb-3">
                <div className="flex gap-1 border border-jg-metal-500 rounded-full items-center px-2 cursor-pointer text-[13px] text-jg-metal-500">
                  <div className="">{tags.length - 3}+</div>
                </div>
              </div>
            )}
          </div>
          <div className="">
            <div onClick={() => setHash(true)}>
              <span className="text-jg-grey-900 cursor-pointer font-medium"> #</span>
            </div>
            {hash && (
              <HashTagSuggestion
                hash
                emailBody={emailBody}
                onClose={() => setHash(false)}
                addHashTag={addHashTag}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UniqueMailWrap
