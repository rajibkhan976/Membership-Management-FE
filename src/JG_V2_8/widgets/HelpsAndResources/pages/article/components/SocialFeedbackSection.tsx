import { Button } from '@comps/uiComps'
import { GenericField } from '@comps/uiComps/forms'
import JGForm from '@comps/uiComps/forms/JG_Form/JGForm'
import { FIELD_TYPE } from '@comps/uiComps/forms/types'
import { Facebook } from '@comps/uiComps/Icons'
import { ChatAltIcon, EmojiHappyIcon, EmojiSadIcon } from '@heroicons/react/outline'
import { FlagIcon } from '@heroicons/react/solid'
import Drawer from '@jg/common/comps/drawer/Drawer'
import { useState } from 'react'

const SocialFeedbackSection = () => {
  const [openDrawerFor, setOpenDrawerFor] = useState<'feedback' | 'report'>()

  return (
    <div className="p-6 bg-jg-grey-50 ">
      <div className="flex justify-between pb-6 flex-col md:flex-row">
        <form>
          <p className="text-globalTextSizeSm text-jg-metal-700 pb-2">Was this Article Helpful?</p>
          <fieldset className="flex flex-row flex-nowrap gap-x-4">
            <label htmlFor="feelingHappy" className="cursor-pointer flex flex-row">
              <input type="radio" name="feeling" id="feelingHappy" value="happy" className="absolute left-[-9999px]" />
              <EmojiHappyIcon className="h-4 w-4 mr-1 text-jg-metal-300" />
              <span className="text-jg-metal-300 text-globalTextSizeMd">Yes</span>
            </label>
            <label htmlFor="feelingSad" className="cursor-pointer flex flex-row">
              <input type="radio" name="feeling" id="feelingSad" value="sad" className="absolute left-[-9999px]" />
              <EmojiSadIcon className="h-4 w-4 mr-1 text-jg-metal-300" />
              <span className="text-jg-metal-300 text-globalTextSizeMd">No</span>
            </label>
          </fieldset>
        </form>
        <div>
          <Button
            btnColor="primary"
            btnSize="lg"
            fillType="plain"
            icon={<ChatAltIcon />}
            iconPosition="left"
            onClick={() => setOpenDrawerFor('feedback')}
            text="Give feedback about this artcle"
            className="bg-transparent  !p-0 mt-6 md:mt-0"
          />
        </div>
      </div>
      <div className="flex justify-start md:justify-between items-center flex-col-reverse md:flex-row ">
        <div className="self-start md:self-auto">
          <p className="text-globalTextSizeSm text-jg-metal-700 pb-2">Share with this article</p>
          <div className="flex gap-x-4">
            <a
              href="#"
              className=" h-[32px] w-[32px] flex justify-center items-center rounded-full bg-white border border-jg-metal-50"
            >
              <i className={' fa fab fa-twitter text-[#1CA1F1] text-[14px]'}></i>
            </a>
            <a
              href="#"
              className=" h-[32px] w-[32px] flex justify-center items-center rounded-full bg-white border border-jg-metal-50"
            >
              <i className={' fa fab fa-instagram text-black text-[14px]'}></i>
            </a>
            <a
              href="#"
              className=" h-[32px] w-[32px] flex justify-center items-center rounded-full bg-white border border-jg-metal-50"
            >
              <i className={' fa  fab fa-pinterest text-[#E4001A] text-[14px] '}></i>
            </a>
            <a
              href="#"
              className=" h-[32px] w-[32px] flex justify-center items-center rounded-full bg-white border border-jg-metal-50"
            >
              <Facebook className="text-[#1778F2] h-[14px] w-[14px]" />
            </a>
            <a
              href="#"
              className=" h-[32px] w-[32px] flex justify-center items-center rounded-full bg-white border border-jg-metal-50"
            >
              <i className={' fa  fab fa-linkedin-square text-[#1778F2] text-[14px]'}></i>
            </a>
          </div>
        </div>
        <Button
          btnColor="secondary"
          btnSize="md"
          fillType="outline"
          icon={<FlagIcon />}
          iconPosition="left"
          onClick={() => setOpenDrawerFor('report')}
          text="Report an issue"
          className="h-8 mb-6 md:mb-0 self-start  md:self-auto"
        />
      </div>
      <Drawer
        isOpen={Boolean(openDrawerFor)}
        title={openDrawerFor ? DrawerInfo[openDrawerFor] : 'Closing Modal'}
        drawerContent={openDrawerFor === 'feedback' ? <FeedbackForm /> : <ReportForm />}
        drawerAction={
          <>
            {/* @ts-ignore */}
            <Button
              as={'label'}
              // @ts-ignore
              htmlFor={openDrawerFor === 'feedback' ? 'Send-Feedback' : 'Send-Report'}
              text="send"
              className="absolute bottom-12 right-4"
            />
          </>
        }
        openDrawer={() => {}}
        closeDrawer={() => setOpenDrawerFor(undefined)}
        showCrossButton
        shouldCloseOnBodyClick
      />
    </div>
  )
}
export default SocialFeedbackSection

const FeedbackForm = () => {
  return (
    <JGForm onSubmit={(value) => console.log('Submitted Value', value)} className={'p-4 space-y-6'}>
      <GenericField
        type={FIELD_TYPE.CheckboxGroup}
        props={{
          type: 'radio',
          name: 'Feedback',
          label: 'How can we improve this article?',
          items: POSSIBLE_PROBLEM_W_ARTICLE.map((cause, i) => ({
            name: i,
            value: cause.title,
            cap: <RadioItemWithDescription key={cause.title} title={cause.title} description={cause.description} />,
          })),
          value: 'male',
          itemContainerClass: '!items-start !mt-6',
          inputClass: '',
          labelClass: '!text-sm !font-semibold !text-jg-metal-500',
        }}
      />
      <GenericField
        type={FIELD_TYPE.TextArea}
        props={{
          label: 'Share additional information and suggestions',
          name: 'Feedback And Suggestions',
          placeholder: 'Additional comment',
          labelWidth: '100%',
          labelClass: 'text-sm leading-4 !text-jg-metal-900',
          rows: 5,
        }}
      />
      <GenericField
        type={FIELD_TYPE.Checkbox}
        props={{
          label: 'Notify me about changes',
          name: 'Notifyme',
          labelClass: 'text-[13px] leading-4 !text-jg-metal-500',
        }}
      />
      <input hidden type={'submit'} id={'Send-Feedback'} />
    </JGForm>
  )
}
const ReportForm = () => {
  return (
    <JGForm onSubmit={(value) => console.log('Submitted Value', value)} className={'p-4 space-y-6'}>
      <GenericField
        type={FIELD_TYPE.TextArea}
        props={{
          label: 'Description',
          name: 'description',
          placeholder: 'Describe your issue with the step',
          labelWidth: '100%',
          labelClass: 'text-sm leading-4 !text-jg-metal-900',
          rows: 5,
        }}
      />
      <GenericField
        type={FIELD_TYPE.TextField}
        props={{
          label: 'Email',
          name: 'email',
          placeholder: 'Write your email address',
          labelClassName: 'text-sm leading-4 !text-jg-metal-900',
        }}
      />
      <input hidden type={'submit'} id={'Send-Report'} />
    </JGForm>
  )
}

const RadioItemWithDescription = ({ title, description }: { title: string; description?: string }) => {
  return (
    <div>
      <h6 className="text-sm leading-4 font-medium text-jg-metal-900">{title}</h6>
      <p className="text-[13px] leading-4 font-normal text-jg-metal-500 mt-1">{description}</p>
    </div>
  )
}

const DrawerInfo = {
  feedback: 'Feedback About This Article',
  report: 'Report An Issue',
}

const POSSIBLE_PROBLEM_W_ARTICLE = [
  { title: 'Inaccurate', description: 'Doesn’t match what I see in the product' },
  { title: 'Hard to understand', description: 'Unclear or translation is wrong' },
  { title: 'Missing information', description: 'Relevent but not comprehensive' },
  { title: 'Minor errors', description: 'Formatting issues, types and broken links' },
  { title: 'Others', description: undefined },
]
