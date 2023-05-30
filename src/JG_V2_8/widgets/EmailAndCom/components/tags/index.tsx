import RemoveTagIcon from '@comps/uiComps/Icons/SVG/RemoveTagIcon'
import CloseIcon from '@comps/uiComps/Icons/SVG/closeIcon'
import { SearchIcon } from '@heroicons/react/solid'
import call from '@jg/_core/services/data/LegacyDataService'
import { FieldArray } from 'formik'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTags } from '../../store/useTags'
import type { SendEmailInitialValue } from '../../types'

type OptinsComponentsProps = {
  setFieldValue: any
  values: SendEmailInitialValue
  handleChange: any
}

const TagsMenagement = ({ setFieldValue, values, handleChange }: OptinsComponentsProps) => {
  const { clubDocId } = useParams()
  const { searchedTags, getTagsList, searchTags } = useTags((state) => state)
  const [tag, setTag] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [deleteTag, setDeleteTag] = useState<number>(0)

  useEffect(() => {
    if (clubDocId) {
      getTagsList(clubDocId)
    }
  }, [clubDocId])

  const onTagSave = () => {
    setError(false)
    if (clubDocId) {
      call(
        ['GoMembership/SaveEmailTag'],
        [{ Arguments: { OwningEntityIdSyncGuid: clubDocId, TagName: tag } }],
        (response: any) => {
          setTag('')
          getTagsList(clubDocId)
        }
      )
    }
  }

  const onTagDelete = async (tagId: number) => {
    call(['GoMembership/DeleteEmailTag'], [{ Arguments: { EmailTagId: tagId } }], (response: any) => {
      // set({ optines: response })
      clubDocId && getTagsList(clubDocId)
    })
  }

  return (
    <>
      <FieldArray
        name="Tags"
        render={(arrayHelpers: any) => (
          <>
            <div className="">
              <div className="flex gap-x-4 items-center mb-4">
                <input
                  type="text"
                  value={tag}
                  maxLength={31}
                  onChange={(e) => {
                    if (e.target.value.length < e.target.maxLength) {
                      setTag(e.target.value)
                      setError(false)
                    } else {
                      setError(true)
                    }
                  }}
                  placeholder="Add a new tag"
                  className="border px-3 p-2 placeholder-jg-metal-300 text-jg-metal-700 shadow-none focus:outline-none w-full"
                />
                <button
                  type="button"
                  disabled={tag === ''}
                  onClick={() => onTagSave()}
                  className="jg-btn disabled:bg-jg-metal-50 disabled:cursor-not-allowed disabled:text-jg-metal-200 cursor-pointer h-[42px] min-w-[90px] text-left jg-btn-solid-primary jg-btn-lg rounded-sm items-center"
                >
                  Add Tag
                </button>
              </div>
              {error && (
                <p className="px-2 pb-2 text-[12px] text-jg-red-500 font-semibold">
                  Tags cannot be more than 30 characters
                </p>
              )}
              {values.Tags && values.Tags.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="pb-2">Selected Tag list</p>
                  {values.Tags.map((TagName, r) => (
                    <div key={r} className="inline-block mr-2 mb-3">
                      <input
                        type="checkbox"
                        className="hidden peer"
                        // checked={values.Tags.some((el) => el.TagName === item.TagName)}
                        id={TagName}
                        value={TagName}
                      />
                      <label
                        htmlFor={TagName}
                        className="flex gap-1 border text-[#4CAF4F]  bg-[#E8F5E9] border-[#A5D6A7] rounded-full items-center px-2 py-1 cursor-pointer leading-4 text-[13px] capitalize"
                      >
                        <div className="">{TagName}</div>
                        <div className="" onClick={() => arrayHelpers.remove(r)}>
                          <CloseIcon width={16} height={16} />
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              )}
              <div className="pt-4 border-t">
                <div className="relative">
                  <div className="absolute top-0 left-0 flex h-full w-8 justify-center items-center">
                    <SearchIcon className="text-jg-grey-500 w-4 m-1" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search form your tag list"
                    className="border px-3 p-2 pl-8 placeholder-jg-metal-300 text-jg-metal-700 shadow-none focus:outline-none w-full"
                    onChange={(e: any) => searchTags(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="py-4">
              {searchedTags &&
                searchedTags.map((item, r) => (
                  <div key={r} className="inline-block mr-2 mb-3">
                    <input
                      type="checkbox"
                      className="hidden peer"
                      // checked={values.Tags.some((el) => el.TagName === item.TagName)}
                      id={item.TagName}
                      value={item.TagName}
                      onChange={async (e) =>
                        // handleChange(e.target.value)
                        e.target.checked ? await arrayHelpers.insert(values.Tags.length, e.target.value) : ''
                      }
                    />
                    <div className="flex gap-1 border border-jg-metal-500 rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize">
                      <label htmlFor={item.TagName} className="leading-[initial] cursor-pointer block">
                        <div className="cursor-pointer">{item.TagName}</div>
                      </label>
                      <div className="" onClick={() => setDeleteTag(item.EmailTagId)}>
                        <CloseIcon width={16} height={16} />
                      </div>
                    </div>
                    {deleteTag !== 0 && (
                      <div
                        className={`absolute top-0 right-0 w-full h-full z-[111] flex items-end transition-all duration-300`}
                      >
                        <div className="absolute top-0 right-0 bg-white w-full opacity-75 h-full -z-10" />
                        <div className="bg-white w-full">
                          <div className="flex items-center w-full justify-between p-4 border border-[#ECEFF1] border-t border-b">
                            <div className="flex items-center gap-2 text-base leading-5 font-semibold text-[#263238]">
                              <div className="">
                                <RemoveTagIcon />
                              </div>
                              <div className="">Remove tag</div>
                            </div>
                            <div className="cursor-pointer" onClick={() => setDeleteTag(0)}>
                              <CloseIcon className="text-[#263238]" width={14} height={14} />
                            </div>
                          </div>
                          <div className="p-4 border-b border-[#ECEFF1]">
                            <div className="text-[14px] leading-4 font-semibold text-[#455A64] mb-2">
                              Transection warning
                            </div>
                            <div className="text-[13px] leading-4 font-normal text-[#607D8B]">
                              Do you want to remove the Marketing tag from the tag list ?
                            </div>
                          </div>
                          <div className="p-4 flex gap-4 justify-end">
                            <div
                              className="bg-[#FAFAFA] border border-[#CFD8DC] py-2 p-4 text-[#263238] text-base leading-4 font-medium rounded-sm cursor-pointer hover:bg-[#d7d5d5]"
                              onClick={() => setDeleteTag(0)}
                            >
                              No
                            </div>
                            <div
                              className="bg-[#FBC02D] hover:bg-[#dca61d] border border-[#FBC02D] py-2 p-4 text-[#263238] text-base leading-4 font-medium rounded-sm cursor-pointer"
                              onClick={async () => {
                                onTagDelete(deleteTag)
                                setDeleteTag(0)
                              }}
                            >
                              Yes
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </>
        )}
      />
    </>
  )
}

export default TagsMenagement
