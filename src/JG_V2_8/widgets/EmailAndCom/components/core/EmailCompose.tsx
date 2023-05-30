import { Button } from '@comps/uiComps'
import JGDialog from '@comps/uiComps/Dialog/Dialog'
import FileAttachment from '@comps/uiComps/FileAttachement'
import CheckedRoundIcon from '@comps/uiComps/Icons/SVG/CheckedRoundIcon'
import ClubIcon from '@comps/uiComps/Icons/SVG/ClubIcon'
import SaveDraft from '@comps/uiComps/Icons/SVG/SaveDraft'
import SaveIcon from '@comps/uiComps/Icons/SVG/SaveIcon'
import SendNow from '@comps/uiComps/Icons/SVG/SendNow'
import SendTest from '@comps/uiComps/Icons/SVG/SendTest'
import TemplateLibrary from '@comps/uiComps/Icons/SVG/TemplateLibrary'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import call from '@jg/_core/services/data/LegacyDataService'
import { ReactComponent as EmailBasicIcon } from '@jg/assets/images/EmailBasicIcon.svg'
import { ReactComponent as EmailTemplateIcon } from '@jg/assets/images/EmailTemplateIcon.svg'
import RichTextEditor from '@jg/common/comps/RichTextEditor/RichTextEditor.jsx'
import StatusDialog from '@jg/common/comps/statusdialog/StatusDialog'
import AppStore from '@jg/store/store'
import { Form, Formik } from 'formik'
import { useWidgetContext } from 'jg-widget'
import { useEffect, useRef, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { EmailTabPropsType } from '../../interfaces/interfaces'
import useEmailTemplateStore from '../../store/EmailTemplates'
import { useEmailAddressMetadata } from '../../store/GetEmailAddressMetadata'
import { EmailTemplateInfo } from '../../store/type'
import { useEmailBody } from '../../store/useEmailBodyStore'
import type { SendEmailInitialValue } from '../../types'
import { sendEmailValidationSchema } from '../../validation/sendEmailValidationSchema'
import EmailTemplateEditor from '../EmailTemplateEditor'
import OptinsAndSettingComponents from '../OptinsAndSetting'
import SaveTemplateSideMenu from '../SaveTemplateSideMenu'
import SendLaterComponents from '../SendLater'
import SegmentModal from '../segmentModal'
import SideMenu from '../sideMenu'
import SpinerLoader from '../spinerLoader'
import { useGetProductBalance } from '../../store/useProductStore'
import Modal from '@jg/common/comps/Modal'
import TitleSection from '../UpgardeSection/TitleSection'
import ShoppingCartProvider from '@jg/providers/ShoppingCartProvider'
import BodySection from '../UpgardeSection/BodySection'
import ButtonSection from '../UpgardeSection/ButtonSection'
import TemplateLibraryComponent from './TemplateLibrary'
import useGetSelectedClub from '@jg/widgets/ClubSwitcher/store/selectedClube'
import { useJGPackageContext } from '@jg/providers/JGPackageProvider'

const EmailCompose = ({ emailDetails, Title }: EmailTabPropsType) => {
  const club = useGetSelectedClub(({ club }) => club)
  const { jgPackage } = useJGPackageContext()
  const { basePath } = useWidgetContext()
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status')
  const [isOvalLoading, setIsOvalLoading] = useState<boolean>(false)
  const [isSufficientBalance, setIsSufficientBalance] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const isDuplicate = useLocation().state
  const navigate = useNavigate()
  const { clubDocId = '' } = useParams()
  const GetProductBalance = useGetProductBalance(({ GetProductBalance }) => GetProductBalance)
  const [isSegment, setIsSegment] = useState<boolean>(false)
  const [isTemplateLibraryComponent, setIsTemplateLibraryComponent] = useState<boolean>(false)
  const [segmentTitle, setSegmentTitle] = useState<string>('')
  const { fetch: getMetadata } = useEmailAddressMetadata()
  const emailAddress = useEmailAddressMetadata(({ emailAddress }) => emailAddress)
  const setBody = useEmailBody(({ setBody }) => setBody)
  const BaseAppPath = AppStore.getState().BaseAppPath
  const isLoading = useEmailAddressMetadata(({ isLoading }) => isLoading)
  const [isTemplateEdited, setTemplateEdited] = useState(false) // changed after template load
  const [isTemplateEditeMode, setTemplateEditMode] = useState(false) // open in edit mode
  const templateInfoRef = useRef<Partial<EmailTemplateInfo>>(null)
  const saveTemplateButtonRef = useRef<HTMLDivElement>(null)
  const updateTemplate = useEmailTemplateStore((state) => state.updateTemplate)
  const [showSendTestDialog, setShowSendTestDialog] = useState<boolean>(false)

  useEffect(() => {
    setBody('')
    clubDocId && getMetadata && getMetadata(clubDocId)
  }, [clubDocId])

  const initialValues: SendEmailInitialValue = {
    EmailId: emailDetails ? emailDetails.EmailId : 0,
    OwningEntityIdSyncGuid: clubDocId ? clubDocId : '',
    Sender: emailDetails ? emailDetails.Sender : '',
    Subject: emailDetails ? emailDetails.Subject : '',
    Body: emailDetails ? emailDetails.Body : '',
    Tags: emailDetails ? emailDetails.Tags : [],
    BodyInJson: emailDetails ? emailDetails.BodyInJson : '',
    ScheduleTimeZoneId: emailDetails ? emailDetails.ScheduleTimeZoneId : 0,
    ScheduledTime: emailDetails ? emailDetails.ScheduledTime : null,
    IsTemplate: emailDetails ? emailDetails.IsTemplate : false,
    SegmentId:
      (searchParams.get('SegmentId') && Number(searchParams.get('SegmentId'))) ||
      (emailDetails ? emailDetails.SegmentId : 0),
    Status: emailDetails ? emailDetails.Status : 0,
    ExcludeUnder16: emailDetails ? emailDetails.ExcludeUnder16 : 0,
    UniqueEmailOnly: emailDetails ? emailDetails.UniqueEmailOnly : 0,
    TestSend: emailDetails ? emailDetails.TestSend : false,
    TestRecipient: emailDetails ? emailDetails.TestRecipient : '',
    OptIns: emailDetails ? emailDetails.OptIns : [],
    Attachments: emailDetails ? emailDetails.Attachments : [],
  }

  const onSubmit = async (values: SendEmailInitialValue) => {
    if (isTemplateEdited) return
    setIsOvalLoading(true)
    if (isDuplicate === 'duplicate') {
      values.EmailId = 0
      await call(['GoMembership/SaveEmail'], [{ email: values }], (res: any) => {
        GetProductBalance(clubDocId)
        res.StatusCode === 200 && navigate(-1)
        res.StatusCode === 402 && setIsSufficientBalance(true)
        setIsOvalLoading(false)
      })
    } else {
      await call(['GoMembership/SaveEmail'], [{ email: values }], (res: any) => {
        GetProductBalance(clubDocId)
        res.StatusCode === 402 && setIsSufficientBalance(true)
        res.StatusCode === 200 && navigate(-1)
        setIsOvalLoading(false)
      })
    }
  }
  const generateTemplateImageRef = useRef<() => Promise<string>>()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={sendEmailValidationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values, handleChange, setFieldValue, isSubmitting, isValid, submitForm, errors }) => {
        const templateChangeEffectProps = {
          isTemplateChanged: isTemplateEdited,
          templateInfoRef: templateInfoRef,
          BodyInJson: values.BodyInJson || '',
          onOverwrite: async () => {
            await updateTemplate({
              ...templateInfoRef.current,
              BodyInJson: values.BodyInJson,
              BodyInHtml: values.Body,
              OwningEntityIdSyncGuid: clubDocId,
            })
          },
          onCancelSave: () => setTemplateEdited(false),
          onSaveNewTemplate: () => {
            setTemplateEdited(false)
            setTimeout(() => saveTemplateButtonRef.current?.click())
          },
        }

        return (
          <>
            <Form>
              <TemplateLibraryComponent
                setIsTemplateLibraryComponent={setIsTemplateLibraryComponent}
                setFieldValue={setFieldValue}
                templateInfoRef={templateInfoRef}
                className={isTemplateLibraryComponent ? 'block' : 'jg-hidden'}
                setTemplateEditMode={setTemplateEditMode}
              />
              <div
                className={`mx-auto mt-0 min-h-[calc(100vh-175px)] border ${isTemplateLibraryComponent ? 'jg-hidden' : 'block'
                  }`}
              >
                <div className="w-full px-2 flex justify-between items-center">
                  {/* If Suficiant balance */}
                  <JGDialog
                    title="Insufficient Email Credits"
                    footer={
                      <button
                        className="jg-btn cursor-pointer text-left jg-btn-solid-primary jg-btn-md rounded-sm inline-flex items-center capitalize ml-4"
                        onClick={() => setOpen(true)}
                      >
                        buy
                      </button>
                    }
                    body={
                      <p>
                        You do not have sufficient email credits to send this email to the segment selected. Click below
                        to purchase a one off email bundle.
                      </p>
                    }
                    open={isSufficientBalance}
                    setOpen={setIsSufficientBalance}
                  />

                  <Modal
                    open={open}
                    setOpen={setOpen}
                    titleSection={<TitleSection />}
                    bodySection={
                      <ShoppingCartProvider>
                        <BodySection />
                      </ShoppingCartProvider>
                    }
                    actionButtons={<ButtonSection />}
                    showActionBtn={true}
                  />

                  {!isTemplateEditeMode && (
                    <>
                      <Link
                        to={`${basePath}${clubDocId}/emails?status=${status}`}
                        className="inline-block cursor-pointer md:mb-0 mb-2"
                      >
                        <ArrowLeftIcon className="w-6 h-6 inline-block text-jg-metal-700" />
                        <span className="ml-2 align-middle text-jg-metal-700 text-[14px] font-semibold">{Title}</span>
                      </Link>
                      <div className="flex md:justify-end items-center">
                        <button
                          type="button"
                          className={`flex gap-2 items-center px-4 py-2 text-[14px] font-bold uppercase ${!values.IsTemplate
                            ? 'text-jg-green-500 border-b-2 border-b-jg-green-500'
                            : 'text-jg-secondary-700 '
                            }`}
                          onClick={() => {
                            setFieldValue('IsTemplate', false)
                          }}
                        >
                          <EmailBasicIcon />
                          <span className="hidden md:block md:visible">Basic</span>
                        </button>
                        {(club?.entityType === null || jgPackage === 'pro') && (
                          <button
                            type="button"
                            className={`flex gap-2 items-center px-4 py-2 text-jg-secondary-700 text-[14px] font-bold uppercase ${values.IsTemplate
                              ? 'text-jg-green-500 border-b-2 border-b-jg-green-500'
                              : 'text-jg-secondary-700'
                              }`}
                            onClick={() => setFieldValue('IsTemplate', true)}
                          >
                            <EmailTemplateIcon />
                            <span className="hidden md:block md:visible">Template</span>
                          </button>
                        )}
                      </div>
                    </>
                  )}
                  {isTemplateEditeMode && (
                    <div
                      onClick={() => {
                        setTemplateEditMode(false)
                        setIsTemplateLibraryComponent(true)
                      }}
                      className="inline-flex items-center px-3 py-1.5 cursor-pointer gap-2 md:mb-0 mb-2 text-jg-metal-700"
                    >
                      <ArrowLeftIcon className="w-5 h-5 inline-block" />
                      <span className="align-middle text-[14px] font-semibold">Edit</span>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="w-full">
                    {isSegment && (
                      <SegmentModal
                        isOpen={isSegment}
                        setIsOpen={setIsSegment}
                        setFieldValue={setFieldValue}
                        setSegmentTitle={setSegmentTitle}
                      />
                    )}
                    {/* {JSON.stringify(values)} */}
                    {/* {JSON.stringify(errors)} */}
                    {!isTemplateEditeMode && (
                      <div className="">
                        <>
                          <label className="flex gap-4 px-4 py-3 border-t">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700 w-20 text-[13px]">
                              From
                            </span>
                            <label
                              htmlFor="from"
                              className={`text-[13px] outline-none shadow-none appearance-none cursor-pointer ${values.Sender ? '' : errors.Sender ? 'text-red-500' : 'text-[#90A4AE]'
                                } w-full`}
                            >
                              {isLoading ? (
                                <SpinerLoader />
                              ) : (
                                values.Sender || errors.Sender || 'Who is sending this email?'
                              )}
                            </label>
                          </label>

                          <SideMenu id={'from'} title={'From Email List'}>
                            <>
                              {emailAddress.length > 0 &&
                                emailAddress.map((item: any, i: number) => (
                                  <label htmlFor="from" key={i} className="relative block">
                                    <div
                                      className={`absolute top-1/2 -translate-y-1/2 right-4 text-[#4CAF4F] ${values.Sender === item.EmailAddress ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                      <CheckedRoundIcon />
                                    </div>
                                    <div
                                      onClick={() => setFieldValue('Sender', item.EmailAddress)}
                                      className="p-4 border-b border-[#ECEFF1] flex gap-2 cursor-pointer"
                                    >
                                      <div className="">
                                        <div className="flex">
                                          <div className="border border-[#B0BEC5] text-[#B0BEC5] rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">
                                            {item.Image ? (
                                              <img
                                                src={`${BaseAppPath}Store/Download?f=${item.Image}&t=${item.Type}&p=${item.UserId}`}
                                              ></img>
                                            ) : (
                                              <ClubIcon />
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="">
                                        <div className="text-sm font-semibold text-[#455A64]">{item.Name}</div>
                                        <div className="text-[13px] text-[#607D8B] font-medium">
                                          {item.EmailAddress}
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                ))}
                            </>
                          </SideMenu>
                          <label className="flex gap-4 px-4 py-3 border-t">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700 w-20 text-[13px]">
                              Recipients
                            </span>
                            <div
                              className={`outline-none shadow-none cursor-pointer w-full text-[13px] ${values.SegmentId > 0 ? '' : errors.SegmentId ? 'text-red-500' : 'text-[#90A4AE]'
                                }`}
                              onClick={() => setIsSegment(true)}
                            >
                              {values.SegmentId > 0
                                ? segmentTitle || emailDetails?.SegmentName || searchParams.get('Title')
                                : errors.SegmentId
                                  ? errors.SegmentId
                                  : 'Email Address - 45cm 12 -17 Years'}
                            </div>
                          </label>
                          <label className="flex gap-4 px-4 py-3 border-t">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700 w-20 text-[13px]">
                              Subject
                            </span>
                            <input
                              onChange={handleChange}
                              name="Subject"
                              value={values.Subject}
                              type="text"
                              placeholder={errors.Subject ? errors.Subject : "What's the subject line for this email?"}
                              className={`outline-none shadow-none w-full text-[13px] ${errors.Subject && 'placeholder-red-500'
                                }`}
                            />
                          </label>
                        </>
                      </div>
                    )}
                    <div className="w-full flex flex-col md:flex-row md:min-h-[calc(100vh-40vh)]">
                      {!isTemplateEditeMode && (
                        <div className={`w-full ${values.IsTemplate ? 'jg-hidden' : 'block'}`}>
                          <RichTextEditor
                            onChange={setFieldValue}
                            value={values.Body}
                            hideBorder={false}
                            name="Body"
                            isTemplate={values.IsTemplate}
                          />
                        </div>
                      )}
                      <div className={`w-full ${values.IsTemplate || isTemplateEditeMode ? 'block' : 'jg-hidden'}`}>
                        <div className="p-2 border-t border-b flex justify-between items-center">
                          <div className="mx-3 text-sm font-medium text-jg-metal-900">
                            {templateInfoRef.current?.Name}
                          </div>
                          <>
                            <div
                              className={`flex justify-end items-center gap-3 ${isTemplateEditeMode ? 'jg-hidden' : 'block'
                                }`}
                            >
                              <div
                                onClick={() => setIsTemplateLibraryComponent(true)}
                                className="flex items-center gap-2 border border-[#7B1FA2] text-[13px] text-[#7B1FA2] leading-4 font-medium rounded-sm px-2 py-1 bg-[#F3E5F5] cursor-pointer hover:bg-[#7B1FA2] hover:text-white transition-all duration-300"
                              >
                                <div className="flex">
                                  <TemplateLibrary />
                                </div>
                                <div className="hidden md:block md:visible">Template Library</div>
                              </div>
                              <WithTemplateChangeEffect {...templateChangeEffectProps}>
                                <SaveTemplateSideMenu
                                  title={isTemplateEditeMode ? 'Update Template' : undefined}
                                  values={values as Partial<SendEmailInitialValue>}
                                  buttonRef={saveTemplateButtonRef}
                                  generateTemplateImageRef={generateTemplateImageRef}
                                  templateInfoRef={templateInfoRef}
                                  isTemplateEdited={isTemplateEdited}
                                />
                              </WithTemplateChangeEffect>
                            </div>
                            {isTemplateEditeMode && (
                              <div
                                className="flex items-center gap-2 border border-[#7B1FA2] text-[13px] text-white leading-4 font-medium rounded-sm px-2 py-1 bg-[#7B1FA2] cursor-pointer hover:bg-[#F3E5F5] hover:text-[#7B1FA2] transition-all duration-300"
                                onClick={() => saveTemplateButtonRef.current?.click()}
                              >
                                <SaveIcon />
                                <span className="">Update Template</span>
                              </div>
                            )}
                          </>
                        </div>
                        <EmailTemplateEditor
                          templateId={templateInfoRef.current?.TemplateId}
                          setFieldValue={setFieldValue}
                          jsonValue={templateInfoRef.current?.BodyInJson || values.BodyInJson}
                          setTemplateEdited={!isTemplateEditeMode ? setTemplateEdited : undefined}
                          generateTemplateImageRef={generateTemplateImageRef}
                          isTemplate={values.IsTemplate}
                        />
                      </div>
                    </div>
                    {errors.Body && <p className="text-center text-red-500">{errors.Body}</p>}
                    {!isTemplateEditeMode && (
                      <>
                        <div className="w-full border-t">
                          <FileAttachment files={values.Attachments} setFieldValue={setFieldValue} hideBorder={true} />
                        </div>
                        <div className="w-full flex flex-col gap-[16px] md:flex-row md:items-center justify-between my-4 px-4">
                          <div className="">
                            <OptinsAndSettingComponents
                              values={values}
                              setFieldValue={setFieldValue}
                              handleChange={handleChange}
                            />
                          </div>
                          <div className="flex md:grid-cols-4 grid-cols-1 gap-x-3 md:gap-x-5 gap-y-3 justify-end">
                            <WithTemplateChangeEffect {...templateChangeEffectProps}>
                              <button
                                type="button"
                                className={`text-[#4CAF4F] h-[32px] font-medium flex gap-x-2 items-center md:justify-end justify-center ${'cursor-pointer'}`}
                                disabled={isSubmitting || !isValid}
                                onClick={async () => {
                                  if (isValid && !isSubmitting) {
                                    setShowSendTestDialog(true)
                                    // await setFieldValue('Status', 2)
                                    // await submitForm()
                                  }
                                }}
                              >
                                {isOvalLoading ? (
                                  <SpinerLoader />
                                ) : (
                                  <>
                                    <span>
                                      <SendTest />
                                    </span>
                                    <span className="hidden md:visible md:block">Test Email</span>
                                  </>
                                )}
                              </button>
                            </WithTemplateChangeEffect>
                            <JGDialog
                              open={showSendTestDialog}
                              setOpen={setShowSendTestDialog}
                              title="Send Test Email"
                              body={
                                <div className="flex-col justify-center">
                                  <input
                                    type="text"
                                    name="TestRecipient"
                                    placeholder="Enter a valid email address"
                                    className="border border-jg-metal-100 focus:outline-none w-4/5 px-2 py-1 my-3"
                                    onChange={(e) => {
                                      if (
                                        e.target.value
                                          .toLowerCase()
                                          .match(
                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                          )
                                      ) {
                                        setFieldValue('TestRecipient', e.target.value)
                                      } else {
                                        setFieldValue('TestRecipient', '')
                                      }
                                    }}
                                  />
                                  <Button
                                    fillType="solid"
                                    text="Send Test Email"
                                    onClick={async () => {
                                      if (values.TestRecipient !== '') {
                                        setFieldValue('TestSend', true)
                                        setFieldValue('Status', 2)
                                        await submitForm()
                                      }
                                    }}
                                    disabled={values.TestRecipient !== '' ? false : true}
                                  />
                                </div>
                              }
                            />
                            <WithTemplateChangeEffect {...templateChangeEffectProps}>
                              <button
                                type="button"
                                className={`flex gap-[8px] justify-center items-center px-[16px] h-[32px] border border-jg-metal-100 text-jg-metal-900 font-medium ${isValid ? 'cursor-pointer' : 'cursor-not-allowed'
                                  }`}
                                style={{
                                  background: `linear-gradient(0deg, #FAFAFA, #FAFAFA), linear-gradient(0deg, #CFD8DC, #CFD8DC)`,
                                }}
                                disabled={isSubmitting || !isValid}
                                onClick={async () => {
                                  if (isValid && !isSubmitting) {
                                    await setFieldValue('Status', 2)
                                    await submitForm()
                                  }
                                }}
                              >
                                {isOvalLoading ? (
                                  <SpinerLoader />
                                ) : (
                                  <>
                                    <SaveDraft />
                                    <span className="hidden md:visible md:block">Save Draft</span>
                                  </>
                                )}
                              </button>
                            </WithTemplateChangeEffect>
                            {(club?.entityType === null || jgPackage === 'pro') && (
                              <WithTemplateChangeEffect {...templateChangeEffectProps}>
                                <SendLaterComponents
                                  setFieldValue={setFieldValue}
                                  submitForm={submitForm}
                                  isSubmitting={isSubmitting}
                                  isValid={isValid}
                                  values={values}
                                />
                              </WithTemplateChangeEffect>
                            )}
                            <WithTemplateChangeEffect {...templateChangeEffectProps}>
                              <button
                                type="button"
                                className={`h-[32px] px-[16px] border-[1px] text-white font-medium flex items-center gap-x-2 ${isValid
                                  ? 'cursor-pointer bg-jg-green-500 border-jg-green-500'
                                  : 'border-jg-grey-500 bg-jg-grey-400 cursor-not-allowed'
                                  }`}
                                disabled={isSubmitting || !isValid}
                                onClick={async () => {
                                  if (isValid && !isSubmitting) {
                                    await setFieldValue('Status', 0)
                                    await submitForm()
                                  }
                                }}
                              >
                                {isOvalLoading ? (
                                  <SpinerLoader />
                                ) : (
                                  <>
                                    <SendNow /> Send Now
                                  </>
                                )}
                              </button>
                            </WithTemplateChangeEffect>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {isOvalLoading && (
                    <div className="w-screen h-screen fixed top-0 left-0 z-[99] bg-jg-grey-900 opacity-50 flex justify-center items-center">
                      <Oval
                        height={80}
                        width={80}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Form>
          </>
        )
      }}
    </Formik>
  )
}

export default EmailCompose

const WithTemplateChangeEffect = ({
  isTemplateChanged,
  onOverwrite,
  onCancelSave,
  onSaveNewTemplate,
  children,
}: {
  isTemplateChanged: boolean
  onOverwrite: () => void
  onCancelSave?: () => void
  onSaveNewTemplate: () => void
  children: React.ReactNode
}) => {
  const [showOverwriteReminder, setOverwriteReminder] = useState(false)
  const [loading, setLoading] = useState(false)
  const previousClickRef = useRef<HTMLDivElement>(null)

  if (!isTemplateChanged) {
    return <div>{children}</div>
  }
  return (
    <>
      <div
        ref={previousClickRef}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          return isTemplateChanged && setOverwriteReminder(true)
        }}
      >
        {children}
      </div>
      <StatusDialog
        isOpen={showOverwriteReminder}
        setIsOpen={() => {
          onCancelSave?.()
          setOverwriteReminder(false)
        }}
        titleText="Template Changed"
        dialogStatus="default"
        descriptionText="You modified the existing template. Do you want to overwrite the existing template or save as a new
            template?"
        customActionElement={
          <div className="flex gap-3 text-sm">
            <small
              onClick={() => {
                onCancelSave?.()
                const node = previousClickRef.current?.children[0] as HTMLElement
                setTimeout(() => node.click(), 100)
                setOverwriteReminder(false)
              }}
              className="px-3 py-2 text-jg-green-500 rounded-sm font-medium cursor-pointer"
            >
              {"Don't Save"}
            </small>
            <small
              onClick={() => {
                onSaveNewTemplate()
                setOverwriteReminder(false)
                onCancelSave?.()
              }}
              className="px-3 py-2 bg-jg-green-500 text-white rounded-sm font-medium cursor-pointer"
            >
              Save New Template
            </small>
            <small
              onClick={async (e) => {
                loading && e.preventDefault()
                setLoading(true)
                await onOverwrite()
                setLoading(false)
                setOverwriteReminder(false)
                onCancelSave?.()
              }}
              className="px-3 py-2 bg-jg-yellow-700 text-black rounded-sm font-medium cursor-pointer"
            >
              {loading ? 'Overwriting' : 'Overwrite'}
            </small>
          </div>
        }
        showDefaultActionBtn={false}
      />
    </>
  )
}
