import SaveIcon from '@comps/uiComps/Icons/SVG/SaveIcon'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'
import Drawer from '@jg/common/comps/drawer/Drawer'
import AnimatedSpin from '@jg/common/comps/loader/AnimatedSpin'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useEmailTemplateStore from '../store/EmailTemplates'
import { EmailTemplateArgs, EmailTemplateInfo } from '../store/type'
import useTemplateCategory from '../store/TemplateCategory'

const SaveTemplateSideMenu = ({
  values,
  buttonRef,
  generateTemplateImageRef,
  title = 'Save As Template',
  templateInfoRef,
  isTemplateEdited = false,
}: {
  values?: { BodyInJson?: string; Body?: string }
  buttonRef: React.RefObject<HTMLDivElement>
  generateTemplateImageRef: React.MutableRefObject<(() => Promise<string>) | undefined>
  title?: string
  templateInfoRef?: React.RefObject<Partial<EmailTemplateInfo>>
  isTemplateEdited?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const { clubDocId } = useParams()

  const createTemplate = useEmailTemplateStore((state) => state.createTemplate)
  const updateTemplate = useEmailTemplateStore((state) => state.updateTemplate)

  const isUpdateAction = title?.toLowerCase()?.includes('update')
  const action = isUpdateAction ? updateTemplate : createTemplate

  if (!clubDocId) return <></>

  return (
    <>
      <div
        className="flex items-center gap-2 border border-[#7B1FA2] text-[13px] text-white leading-4 font-medium rounded-sm px-2 py-1 bg-[#7B1FA2] cursor-pointer hover:bg-[#F3E5F5] hover:text-[#7B1FA2] transition-all duration-300"
        onClick={() => !isTemplateEdited && setOpen(true)}
        ref={buttonRef}
      >
        <div className="flex">
          <SaveIcon />
        </div>
        <div className="hidden md:block md:visible">Save Template</div>
      </div>
      <Drawer
        isOpen={open}
        title={title}
        drawerContent={
          <DrawerContent
            buttonLabel={isUpdateAction ? 'Update' : 'Save'}
            onSave={async (templateInfo) => {
              let imageResponse: string | undefined
              try {
                // Capture template image
                imageResponse = await generateTemplateImageRef.current?.()
                console.log(imageResponse)
              } finally {
                const payload = {
                  ...templateInfo,
                  BodyInJson: values?.BodyInJson,
                  BodyInHtml: values?.Body,
                  TemplateImage: imageResponse,
                  TemplateId: templateInfoRef?.current?.TemplateId,
                }
                await action(payload)
                setOpen(false)
              }
            }}
            templateInfoRef={templateInfoRef}
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

export default SaveTemplateSideMenu

const DrawerContent = ({
  buttonLabel = 'Save',
  onSave,
  templateInfoRef,
}: {
  buttonLabel?: string
  onSave: (TemplateInfo: EmailTemplateArgs) => void
  templateInfoRef?: React.RefObject<Partial<EmailTemplateInfo>>
}) => {
  const { clubDocId = '' } = useParams()

  const [categoryInput, setCategoryInput] = useState('')
  const [templateName, setTemplateName] = useState(templateInfoRef?.current?.Name)
  const [templateDesc, setTemplateDesc] = useState(templateInfoRef?.current?.Description)
  const [isEmptySubmit, setIsEmptySubmit] = useState(false)
  const [category, setCategory] = useState(templateInfoRef?.current?.CategoryId)
  const categories = useTemplateCategory((state) => state.categories)
  const getAllCategories = useTemplateCategory((state) => state.getAllCategories)
  const createCategory = useTemplateCategory((state) => state.createCategory)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllCategories(clubDocId)
  }, [getAllCategories, clubDocId])

  if (!clubDocId) return <></>

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
        <div className="p-4 border-b flex-none">
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
                className="rounded-sm border border-[#455A64] bg-white shadow py-2 px-3 text-[13px] text-[#455A64] font-medium leading-4 w-full"
                value={templateName}
                onChange={(e) => {
                  setTemplateName(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="mb-6 last:mb-0">
            <div className="text-base leading-4 font-medium text-[#263238] mb-1">Description</div>
            <div className="">
              <textarea
                placeholder="Write some description about the template"
                className="rounded-sm border border-[#455A64] bg-white shadow h-20 py-2 px-3 text-[13px] text-[#455A64] font-medium leading-4 w-full"
                value={templateDesc}
                onChange={(e) => setTemplateDesc(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="py-6 px-4 flex-grow">
          <div className="flex gap-x-4 items-center mb-4">
            <input
              type="text"
              placeholder="Add new category"
              className="border px-3 p-2 placeholder-jg-metal-300 text-jg-metal-700 shadow-none focus:outline-none w-full"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addNewCategory()}
            />
            <button
              type="button"
              className="jg-btn disabled:bg-jg-metal-50 disabled:cursor-not-allowed disabled:text-jg-metal-200 cursor-pointer h-[42px]text-left jg-btn-solid-primary jg-btn-lg rounded-sm items-center"
              onClick={addNewCategory}
              disabled={categoryInput.length === 0}
            >
              Add
            </button>
          </div>
          <div className="mb-16">
            <div className="text-base leading-4 font-medium text-[#263238] mb-4">Select category from your list</div>
            <div className="">
              {categories.map((item, i) => (
                <div key={i} className="flex items-center gap-2 mb-4 last:mb-0">
                  <input
                    type={'radio'}
                    id={`item-${i}`}
                    name={'template category'}
                    value={item.CategoryId}
                    checked={category === item.CategoryId}
                    onChange={(e) => setCategory(+(e.target.value || 0))}
                    className="bg-transparent appearance-none w-5 h-5 border-4 border-transparent rounded-full cursor-pointer ring-1 ring-[#455A64] transition-all checked:border-white checked:bg-[#4CAF4F] checked:ring-[#4CAF4F]"
                  />
                  <label htmlFor={`item-${i}`} className="cursor-pointer">
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
            {buttonLabel}
          </button>
        </div>
      </FancyScroll>
      {loading && (
        <div className="absolute inset-0 z-10 flex justify-center items-center">
          <AnimatedSpin className="!text-jg-green-600 !w-6 !h-6 scale-150" />
        </div>
      )}
    </>
  )
}
