import Drawer from '@jg/common/comps/drawer/Drawer'
import { EmailTemplateArgs, EmailTemplateInfo } from '../store/type'
import { useEffect, useState } from 'react'
import useTemplateCategory from '../store/TemplateCategory'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'
import AnimatedSpin from '@jg/common/comps/loader/AnimatedSpin'
import useEmailTemplateStore from '../store/EmailTemplates'
import { useParams } from 'react-router-dom'

const DuplicateTemplateSideMenu = ({ templateInfo }: { templateInfo?: EmailTemplateInfo }) => {
  const [open, setOpen] = useState(false)
  const createTemplate = useEmailTemplateStore((state) => state.createTemplate)

  return (
    <>
      <div
        className="text-[13px] text-[#455A64] leading-4 font-medium px-3 py-2 hover:bg-gray-100 cursor-pointer block"
        onClick={() => setOpen(true)}
      >
        Duplicate
      </div>
      <Drawer
        isOpen={open}
        title={'Save As Template'}
        drawerContent={
          <DrawerContent
            templateInfo={templateInfo}
            onSave={async (duplicateTemplate) => {
              await createTemplate({
                ...duplicateTemplate,
                BodyInJson: templateInfo?.BodyInJson || '',
                BodyInHtml: templateInfo?.BodyInHtml || '',
                TemplateImage: templateInfo?.TemplateImage,
              })
              setOpen(false)
            }}
          />
        }
        showCrossButton
        shouldCloseOnBodyClick
        openDrawer={() => setOpen(true)}
        closeDrawer={() => setOpen(false)}
        showFrom="right"
      />
    </>
  )
}

export default DuplicateTemplateSideMenu

const DrawerContent = ({
  templateInfo,
  onSave,
}: {
  templateInfo?: Partial<EmailTemplateInfo>
  onSave: (TemplateInfo: EmailTemplateArgs) => void
}) => {
  const { clubDocId = '' } = useParams()

  const createCategory = useTemplateCategory((state) => state.createCategory)
  const categories = useTemplateCategory((state) => state.categories)
  const getAllCategories = useTemplateCategory((state) => state.getAllCategories)

  const [categoryInput, setCategoryInput] = useState('')
  const [templateName, setTemplateName] = useState(templateInfo?.Name + ' (Duplicate)' || '')
  const [templateDesc, setTemplateDesc] = useState(templateInfo?.Description || '')
  const [category, setCategory] = useState(templateInfo?.CategoryId || 0)

  const [isEmptySubmit, setIsEmptySubmit] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllCategories(clubDocId)
  }, [getAllCategories, clubDocId])

  const addNewCategory = () => {
    setLoading(true)
    const newCategory = categoryInput.trim()
    newCategory.length > 0 && createCategory({ OwningEntityIdSyncGuid: clubDocId, Name: newCategory })
    setCategoryInput('')
    setLoading(false)
  }

  return (
    <>
      <FancyScroll className={`h-full flex flex-col ${loading ? 'opacity-50' : ''}`}>
        <div className="p-4 border-b">
          {isEmptySubmit && (
            <div
              className="mb-2 p-2 border border-jg-red-200 font-medium text-sm text-ce
        text-jg-red-500"
            >
              One or more required fields are empty!
            </div>
          )}
          <div className="mb-6 last:mb-0">
            <div className="text-base leading-4 font-medium text-[#263238] mb-1">
              Template Name <span className="text-red-500">*</span>
            </div>
            <div className="">
              <input
                type="text"
                placeholder="Template Name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="rounded-sm border border-[#455A64] bg-white shadow py-2 px-3 text-[13px] text-[#455A64] font-medium leading-4 w-full"
              />
            </div>
          </div>
          <div className="mb-6 last:mb-0">
            <div className="text-base leading-4 font-medium text-[#263238] mb-1">Description</div>
            <div className="">
              <textarea
                placeholder="Write some description about the template"
                value={templateDesc}
                onChange={(e) => setTemplateDesc(e.target.value)}
                className="rounded-sm border border-[#455A64] bg-white shadow h-20 py-2 px-3 text-[13px] text-[#455A64] font-medium leading-4 w-full"
              />
            </div>
          </div>
        </div>
        <div className="py-6 px-4">
          <div className="flex gap-x-4 items-center mb-4">
            <input
              type="text"
              placeholder="Add new category"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addNewCategory()}
              className="border px-3 p-2 placeholder-jg-metal-300 text-jg-metal-700 shadow-none focus:outline-none w-full"
            />
            <button
              type="button"
              onClick={addNewCategory}
              disabled={categoryInput.length === 0}
              className="jg-btn disabled:bg-jg-metal-50 disabled:cursor-not-allowed disabled:text-jg-metal-200 cursor-pointer h-[42px]text-left jg-btn-solid-primary jg-btn-lg rounded-sm items-center"
            >
              Add
            </button>
          </div>
          <div className="">
            <div className="text-base leading-4 font-medium text-[#263238] mb-4">Select a category from the list</div>
            <div className="">
              {categories.map((item, i) => (
                <div key={item.CategoryId} className="flex items-center gap-2 mb-4 last:mb-0">
                  <input
                    type={'radio'}
                    id={`item-${item.CategoryId}`}
                    name={'new'}
                    value={item.CategoryId}
                    checked={item.CategoryId === category}
                    onChange={() => setCategory(item.CategoryId || 0)}
                    className="bg-transparent appearance-none w-5 h-5 border-4 border-transparent rounded-full cursor-pointer ring-1 ring-[#455A64] transition-all checked:border-white checked:bg-[#4CAF4F] checked:ring-[#4CAF4F]"
                  />
                  <label htmlFor={`item-${item.CategoryId}`} className="cursor-pointer">
                    {item.Name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 z-10 flex justify-end p-4 bg-jg-metal-50">
          <button
            disabled={loading}
            onClick={async () => {
              if (!templateName || !category) {
                return setIsEmptySubmit(true)
              }
              setLoading(true)
              await onSave({
                OwningEntityIdSyncGuid: clubDocId,
                CategoryId: category,
                Name: templateName,
                Description: templateDesc,
              })
              setLoading(false)
            }}
            className="jg-btn disabled:bg-jg-metal-50 disabled:cursor-not-allowed disabled:text-jg-metal-200 cursor-pointer h-[42px]text-left jg-btn-solid-primary jg-btn-lg rounded-sm items-center"
          >
            save
          </button>
        </div>
        <div className="mb-16"></div> {/* make up for absolute button */}
      </FancyScroll>
      {loading && (
        <div className="absolute inset-0 z-10 flex justify-center items-center">
          <AnimatedSpin className="!text-jg-green-600 !w-6 !h-6 scale-150" />
        </div>
      )}
    </>
  )
}
