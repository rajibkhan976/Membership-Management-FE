import SearchComponent from '@jg/common/comps/searchBar/SearchComponent'
import { useEmailList } from '@jg/widgets/EmailAndCom/store/EmailStore'
import { useTags } from '@jg/widgets/EmailAndCom/store/emailTagsStore'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Badge from '../Badges/Badge'
import { Search } from '../Icons'

const TagFilterDropdown = ({ setSearch, setShowTagFilterOptions, showTagFilterOptions }: any) => {
  const { clubDocId } = useParams()
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchedTags, setSearchedTags] = useState<string[]>()
  const {
    key,
    sideFilterStatus,
    dateFilterData,
    tagFilterData,
    setTagFilterData,
    removeTag,
    isLoading,
    setTagFilterActive,
    fetch: getEmailList,
    pageNumber,
    numberOfRows,
    setValueNull,
  } = useEmailList((state) => state)
  const { fetch: getTagItems, tags, filterTags } = useTags((state) => state)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let newArray: string[] = []
    newArray = tags.map((tag) => tag.Title)
    setSearchedTags(newArray)
  }, [tags])

  useEffect(() => {
    showTagFilterOptions && clubDocId && getTagItems(clubDocId)
  }, [clubDocId, getTagItems, showTagFilterOptions])

  useEffect(() => {
    if (tagFilterData.length === 0) {
      clubDocId &&
        getEmailList({
          Method: 'GetEmailList',
          OwningEntityId: clubDocId,
          PageNumber: pageNumber,
          NumberOfRows: numberOfRows,
          Status: sideFilterStatus === 100 ? null : sideFilterStatus,
          Key: key,
          Date: dateFilterData,
          Tags: tagFilterData,
        })
    } else if (tagFilterData.length > 0) {
      setValueNull()
      clubDocId &&
        getEmailList({
          Method: 'GetEmailList',
          OwningEntityId: clubDocId,
          PageNumber: pageNumber,
          NumberOfRows: numberOfRows,
          Status: sideFilterStatus === 100 ? null : sideFilterStatus,
          Key: key,
          Date: dateFilterData,
          Tags: tagFilterData,
        })
      setSearch(true)
    }
  }, [clubDocId, getEmailList, pageNumber, tagFilterData.length])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowTagFilterOptions(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [setShowTagFilterOptions])

  const handleSearchValue = (value: string) => {
    setSearchValue(value)
    if (value) {
      setTagFilterActive(true)
      const newArray = tags.filter((tag) => tag.Title.toLowerCase().includes(value.toLowerCase()))
      setSearchedTags(newArray.map((tag) => tag.Title))
    } else {
      clubDocId && getTagItems(clubDocId)
      if (tagFilterData.length === 0) {
        setTagFilterActive(false)
      }
    }
  }

  const handleTagsChange = (event: ChangeEvent<HTMLInputElement>, newTag: string) => {
    setTagFilterActive(true)
    if (event.target.checked) {
      setTagFilterData(newTag)
    } else {
      removeTag(newTag)
    }
  }

  const selectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setTagFilterData('')
      setTagFilterActive(true)
      tags.length > 0 && tags.map((item) => setTagFilterData(item.Title))
    } else {
      setTagFilterData('')
      setTagFilterActive(false)
      setSearchValue('')
      setShowTagFilterOptions(true)
    }
  }

  const clearAll = () => {
    setTagFilterData('')
    setTagFilterActive(false)
    setSearchValue('')
    setShowTagFilterOptions(false)
    setValueNull()
    setSearch(true)
  }

  return (
    <>
      <div ref={ref} className="relative inline-block text-left h-[36px] w-full lg:w-auto">
        <button
          onClick={() => {
            setShowTagFilterOptions(!showTagFilterOptions)
          }}
          className="hidden visible lg:flex items-center border border-[#CFD8DC] text-[#90A4AE] text-[13px] focus-within:border-[#455A64] focus-within:text-[#455A64] rounded-sm p-2 "
        >
          <b className="mr-2">Tag</b>
          {tagFilterData.length > 0 && (
            <Badge
              className="bg-[#E8F5E9] border border-[#A5D6A7] text-[#4CAF4F] font-bold p-0"
              fillType="faded"
              label={tagFilterData[0]}
              size="xs"
              variant="primary"
              rounded={true}
            />
          )}
          {tagFilterData.length > 1 && (
            <Badge
              className="bg-[#E8F5E9] border border-[#A5D6A7] text-[#4CAF4F] font-bold ml-1 p-1"
              fillType="faded"
              label={`${tagFilterData.length - 1}+`}
              size="xs"
              variant="primary"
              rounded={true}
            />
          )}
          <div>
            <svg
              className="mr-1 ml-1"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.66699 6.6665L8.00033 9.99984L11.3337 6.6665H4.66699Z" fill="#263238" />
            </svg>
          </div>
        </button>
        {showTagFilterOptions && (
          <div className="lg:absolute sm:left-0 sm:right-auto lg:mt-2 min-w-[212px] origin-top-right divide-y divide-gray-100 rounded-md bg-white lg:shadow-lg lg:ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <SearchComponent
              placeholder="Search Tag"
              value={searchValue}
              onchange={handleSearchValue}
              icon={<Search className="text-[#90A4AE] ml-2" />}
            />
            <div className="flex justify-start gap-3 px-2 py-1 text-[#90A4AE] text-[13px] ">
              <input
                type="checkbox"
                className="border border-[#CFD8DC]"
                id={'all'}
                name={'all'}
                value={'all'}
                onChange={(event) => selectAll(event)}
                disabled={isLoading}
                checked={tags.length > 0 && tagFilterData.length === tags.length}
              />
              <label htmlFor={'all'}>All</label>
            </div>
            <div className="p-2 pt-0 overflow-y-scroll h-[70vh] lg:h-[200px]">
              {searchedTags &&
                searchedTags.map((option, index) => (
                  <div className="flex justify-start items-baseline gap-3 py-1 text-[#90A4AE] text-[13px]" key={index}>
                    <input
                      type="checkbox"
                      className="border border-[#CFD8DC]"
                      id={option}
                      name={option}
                      value={option}
                      onChange={(e) => handleTagsChange(e, option)}
                      checked={tagFilterData.includes(option)}
                      disabled={isLoading}
                    />
                    <label htmlFor={option}>{option}</label>
                    <br></br>
                  </div>
                ))}
            </div>
            <div className="hidden visible lg:flex justify-end gap-3 p-2">
              <button
                onClick={() => clearAll()}
                className="bg-[#FAFAFA] rounded-sm border border-[#CFD8DC] text-[#263238] text-[14px] font-semibold h-[32px] px-3"
              >
                Clear
              </button>
              <button
                onClick={() => setShowTagFilterOptions(false)}
                className="bg-[#4CAF4F] rounded-sm border border-[#4CAF4F] text-white text-[14px] font-semibold h-[32px] px-3"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default TagFilterDropdown
