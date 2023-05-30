import DeleteIcon from '@comps/uiComps/Icons/SVG/DeleteIcon'
import Dots from '@comps/uiComps/Icons/SVG/Dots'
import PremiumIcon from '@comps/uiComps/Icons/SVG/PremiumIcon'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { ModalOld, SearchField } from '@jg/common/comps'
import { useCallback, useEffect, useRef, useState } from 'react'
import useEmailTemplateStore from '../../store/EmailTemplates'
import DuplicateTemplateSideMenu from '../DuplicateTemplateSideMenu'
import useTemplateCategory from '../../store/TemplateCategory'
import { EmailTemplateInfo } from '../../store/type'
import { useParams } from 'react-router'

type TemplateLibraryComponentProps = {
  setIsTemplateLibraryComponent: any
  setFieldValue?: any
  templateInfoRef: React.RefObject<Partial<EmailTemplateInfo> | null>
  setTemplateEditMode: (v: boolean) => void
  className?: string
}
const TemplateLibraryComponent = ({
  setIsTemplateLibraryComponent,
  setFieldValue,
  templateInfoRef = { current: {} },
  setTemplateEditMode,
  className = '',
}: TemplateLibraryComponentProps) => {
  const [deletePopup, setDeletePopup] = useState(0)
  const templatesByCategories = useEmailTemplateStore((state) => state.templatesByCategories)
  const getTemplatesByCategories = useEmailTemplateStore((state) => state.getTemplatesByCategories)
  const deleteTemplate = useEmailTemplateStore((state) => state.deleteTemplate)
  const { clubDocId } = useParams()
  const [searchTerms, setSearchTerms] = useState({ SearchKey: '', CategoryIds: '', OwningEntityId: clubDocId || '' })
  const [searchResult, setSearchResult] = useState<typeof templatesByCategories>([])
  // const [searchedTemplateByCategories, setSearchedTemplateByCategories] =
  //   useState<typeof templatesByCategories>(templatesByCategories)
  useEffect(() => {
    getTemplatesByCategories({ OwningEntityId: clubDocId || '' })
  }, [clubDocId, getTemplatesByCategories])

  useEffect(() => {
    const timeoutHandle = setTimeout(() => {
      // getTemplatesByCategories(searchTerms)
      const filterByCategory = templatesByCategories.filter(
        (cat) => !searchTerms.CategoryIds || +searchTerms.CategoryIds === cat.CategoryId
      )
      const filterByText = searchTerms.SearchKey
        ? filterByCategory.map((item) => ({
            ...item,
            Rows: item.Rows.filter((template) =>
              `${template.Name} ${template.Description}`.toLowerCase().includes(searchTerms.SearchKey.toLowerCase())
            ),
          }))
        : filterByCategory
      setSearchResult(filterByText)
    }, 500)
    return () => clearTimeout(timeoutHandle)
  }, [searchTerms, templatesByCategories, getTemplatesByCategories])

  return (
    <div className={`mx-auto mt-0 min-h-[calc(100vh-175px)] border ${className}`}>
      <div className="w-full px-2 py-1 md:flex justify-between items-center">
        <div onClick={() => setIsTemplateLibraryComponent(false)} className="inline-block cursor-pointer md:mb-0 mb-2">
          <ArrowLeftIcon className="w-6 h-6 inline-block text-jg-green-700" />
          <span className="ml-2 align-middle text-jg-metal-700 text-[14px] font-semibold">Template Library</span>
        </div>
      </div>
      <div className="py-2 md:px-4 px-2 md:flex grid md:gap-4 gap-2 border-t">
        <div className="border rounded-2">
          <SearchField
            className="test"
            placeholder="Search"
            onChange={async (value) => {
              setSearchTerms((terms) => ({ ...terms, SearchKey: value }))
            }}
          />
        </div>
        {/* <div className="border rounded-2">
          <div className="w-full md:w-60">
            <select className="shadow-none outline-none w-full border rounded-sm border-[#ECEFF1] px-3 py-2 text-[13px] text-[#455A64] font-medium leading-4">
              <option value="0">Order By</option>
              <option value="0">Order By</option>
              <option value="0">Order By</option>
            </select>
          </div>
        </div> */}
        <div className="border rounded-2">
          <div className="w-full md:w-60">
            <SelectCategories
              onChange={(categoryId) =>
                setSearchTerms((terms) => ({ ...terms, CategoryIds: categoryId > 0 ? `${categoryId}` : '' }))
              }
            />
          </div>
        </div>
        {/* <div className="border rounded-2 flex items-center">
          <div className="py-2 px-3 cursor-pointer text-base leading-4 font-medium flex items-center gap-2 border-r last:border-none bg-[#4CAF4F] text-white">
            All
          </div>
          <div className="py-2 px-3 cursor-pointer text-base text-[#263238] leading-4 font-medium flex items-center gap-2 border-r last:border-none">
            <div className="text-[#4CAF4F]">
              <PremiumIcon />
            </div>
            <div className="">Premium</div>
          </div>
          <div className="py-2 px-3 cursor-pointer text-base text-[#263238] leading-4 font-medium flex items-center gap-2 border-r last:border-none">
            Free
          </div>
        </div> */}
      </div>
      <div
        className={`fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center transition-all duration-300 ${
          deletePopup !== 0 ? 'visible opacity-100' : 'invisible opacity-0'
        } `}
        style={{ background: `rgba(38, 50, 56, 0.7)` }}
      >
        <div className="bg-white rounded-lg max-w-lg w-full">
          <div className="border-b p-4">
            <div className="text-base text-[#455A64] font-semibold leading-4 mb-2">Are you sure?</div>
            <div className="text-[13px] text-[#455A64] font-normal leading-5">
              This will permanently delete from your template library. Are you sure you want to continue?
            </div>
          </div>
          <div className="p-4 flex items-center justify-end gap-4">
            <div
              onClick={() => setDeletePopup(0)}
              className="flex items-center justify-center py-2 px-4 text-base text-[#263238] font-medium leading-4 bg-[#FAFAFA] hover:bg-[#e7e5e5] border border-[#CFD8DC] rounded cursor-pointer"
            >
              <div className="">Cancel</div>
            </div>
            <div className="flex gap-1 items-center justify-center py-2 px-4 text-base text-white font-medium leading-4 bg-[#F44236] hover:bg-[#cc281c] border border-[#F44236] rounded cursor-pointer">
              <div className="flex">
                <DeleteIcon />
              </div>
              <div
                className=""
                onClick={async () => {
                  await deleteTemplate(deletePopup)
                  getTemplatesByCategories({ OwningEntityId: clubDocId || '' })
                  setDeletePopup(0)
                }}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {searchResult?.map((item, index) => (
          <div className="" key={index}>
            <div className="py-2 px-4 bg-[#FAFAFA] border-b border-t">
              <div className="text-[#263238] font-semibold text-base leading-4">
                {item.CategoryName} ({item.Rows.length})
              </div>
            </div>
            <div className="p-4">
              <div className="grid jgxl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                {item.Rows?.map((temp, i) => (
                  <div
                    key={i}
                    className="border rounded cursor-pointer"
                    onClick={() => {
                      setFieldValue('BodyInJson', temp.BodyInJson)
                      setFieldValue('Body', temp.BodyInHtml)
                      setIsTemplateLibraryComponent(false)
                      // @ts-ignore
                      templateInfoRef.current = temp
                    }}
                  >
                    <div className="h-[200px] bg-[#FAFAFA] flex items-center justify-center gap-4 border-b relative">
                      <div className="w-40 h-full bg-[#E0E0E0]">
                        <img className="w-full h-full object-cover" src={temp.TemplateImage} />
                      </div>
                      <div className=" absolute left-3 top-3">
                        {temp.IsPremium && (
                          <div className="flex  text-[#4CAF4F]">
                            <PremiumIcon width={24} height={24} />
                          </div>
                        )}
                      </div>
                      <DotMenu templateId={temp.TemplateId}>
                        <div
                          className="text-[13px] text-[#455A64] leading-4 font-medium px-3 py-2 hover:bg-gray-100"
                          onClick={() => {
                            // @ts-ignore
                            templateInfoRef.current = temp
                            setFieldValue('BodyInJson', temp.BodyInJson)
                            setFieldValue('Body', temp.BodyInHtml)
                            setTemplateEditMode(true)
                            setIsTemplateLibraryComponent(false)
                          }}
                        >
                          Edit
                        </div>
                        <DuplicateTemplateSideMenu templateInfo={temp} />
                        {/* <div className="text-[13px] text-[#455A64] leading-4 font-medium px-3 py-2 hover:bg-gray-100">
                          Preview
                        </div> */}
                        <PreviewTemplate html={temp.BodyInHtml} />
                        <div
                          className="text-[13px] text-[#455A64] leading-4 font-medium px-3 py-2 hover:bg-gray-100"
                          onClick={() => setDeletePopup(temp.TemplateId)}
                        >
                          Delete
                        </div>
                      </DotMenu>
                    </div>
                    <div className="p-4">
                      <div className="text-base text-[#263238] font-medium leading-4 mb-2">{temp.Name}</div>
                      <div className="text-[13px] text-[#607D8B] font-normal leading-4 truncate">
                        {temp.Description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TemplateLibraryComponent

const SelectCategories = ({ onChange }: { onChange?: (categoryId: number) => void }) => {
  const categories = useTemplateCategory((state) => state.categories)
  const getAllCategories = useTemplateCategory((state) => state.getAllCategories)
  const { clubDocId } = useParams()
  useEffect(() => {
    getAllCategories(clubDocId || '')
  }, [getAllCategories, clubDocId])
  return (
    <select
      onChange={(e) => (e.target.value ? onChange?.(+e.target.value) : undefined)}
      className="shadow-none outline-none w-full border rounded-sm border-[#ECEFF1] px-3 py-2 text-[13px] text-[#455A64] font-medium leading-4"
    >
      <option value={-1}>Choose a category</option>
      {categories.map((category) => {
        return (
          <option value={category.CategoryId} key={category.CategoryId}>
            {category.Name}
          </option>
        )
      })}
    </select>
  )
}

const DotMenu = ({ templateId, children }: { templateId: number; children: React.ReactNode }) => {
  // OK for now. But not very optiomized. Has room for improvement
  const dotMenuRef = useRef<HTMLInputElement>(null)
  const listContainerRef = useRef<HTMLInputElement>(null)
  const handleClickOutside = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (
        dotMenuRef.current &&
        e.target &&
        !dotMenuRef.current.contains(e.target as Node) &&
        listContainerRef.current &&
        !listContainerRef.current.contains(e.target as Node)
      ) {
        dotMenuRef.current.checked = false
      }
    },
    [dotMenuRef]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
      document.removeEventListener('touchstart', handleClickOutside, true)
    }
  }, [handleClickOutside])
  return (
    <>
      <div
        className=" absolute right-3 top-3"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <label htmlFor={`dropdownItem_${templateId}`}>
          <div className="border bg-white rounded-full cursor-pointer w-5 h-5 flex items-center justify-center text-[#455A64] peer">
            <Dots />
          </div>
        </label>
        <input type="checkbox" id={`dropdownItem_${templateId}`} className="peer hidden" ref={dotMenuRef} />
        <div className="absolute right-0 top-full pt-1 invisible peer-checked:visible">
          <div className="bg-white shadow rounded-md w-36 overflow-hidden" ref={listContainerRef}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

const PreviewTemplate = ({ html }: { html?: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="text-[13px] text-[#455A64] leading-4 font-medium px-3 py-2 hover:bg-gray-100"
      >
        Preview
      </div>
      <ModalOld
        open={open}
        setOpen={setOpen}
        bodySection={() => {
          return (
            <div
              className="flex flex-col items-center bg-jg-grey-600"
              dangerouslySetInnerHTML={{ __html: html || '' }}
            ></div>
          )
        }}
      />
    </>
  )
}
