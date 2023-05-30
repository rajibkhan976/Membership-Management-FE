import PyramidChart from '@comps/uiComps/Charts/PyramidChart'
import SmoothLineChart from '@comps/uiComps/Charts/SmoothLineChart'
import { EmailReports } from '@comps/uiComps/EmailList/Interfaces'
import ReportCardItems from '@comps/uiComps/EmailList/components/report/ReportCardItems'
import ReportListItems from '@comps/uiComps/EmailList/components/report/ReportListItem'
import { CursorDefaultClick, EmailCheck, EmailOpen } from '@comps/uiComps/Icons'
import EmailBounceStatus from '@comps/uiComps/Icons/SVG/EmailBounceStatus'
import CloseIcon from '@comps/uiComps/Icons/SVG/closeIcon'
import { CheckIcon } from '@heroicons/react/solid'
import { ActivityType } from '@jg/widgets/EmailAndCom/enum'
import {
  useCreateActivityBasedSegment,
  useRecepientCountActivity,
} from '@jg/widgets/EmailAndCom/store/EmailReportStore'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import ChartFilterWIthDate from './ChartFilterWIthDate'
import { Form, Formik } from 'formik'
import { TiFlashOutline } from 'react-icons/ti'
import { dateFilterOptions } from '@jg/widgets/Events/comps/EventDateValuePicker'
import H1 from '@comps/uiComps/Heading/H1'

type ActivitybasedSegmentInitialValues = {
  segmentTitle: string
  segmentDescription: string
}
const Report = ({ items, ChartData }: EmailReports) => {
  const sum = items.Delivered + items.Bounced
  const { Data } = useRecepientCountActivity((state) => state)
  const [createSegmentSectionOpen, setCreateSegmentSectionOpen] = useState<number>(ActivityType.ALL)
  const { isError, isLoading, setIsLoading, setIsError, createActivityBasedSegment } = useCreateActivityBasedSegment(
    (state) => state
  )
  const { id } = useParams()
  const { clubDocId } = useParams()

  const initialValues: ActivitybasedSegmentInitialValues = {
    segmentTitle: '',
    segmentDescription: '',
  }

  const validationSchema = Yup.object({
    segmentTitle: Yup.string().required('Segment name is required'),
    segmentDescription: Yup.string().required('Segment description is required'),
  })

  // useEffect(() => {
  //   if (id && dateFilterData) {
  //     getRecipientCountByActivity(+id, 0,  dateFilterData[0], dateFilterData[1])
  //   }
  // }, [dateFilterData, dateFilterActive])

  // useEffect(() => {
  //   setShowDateFilterOptions(false)
  // }, [setShowDateFilterOptions])

  const onSubmit = (values: ActivitybasedSegmentInitialValues) => {
    if (clubDocId && id) {
      createActivityBasedSegment(
        clubDocId + '',
        values.segmentTitle,
        values.segmentDescription,
        +id,
        createSegmentSectionOpen
      )
    }
  }

  return (
    <>
      {!isLoading && !isError && (
        <div className="h-24 w-[382px] absolute top-[10px] left-[33%] bg-white z-20 drop-shadow-md flex justify-between items-center p-4">
          <div className="h-8 w-8 rounded-full bg-jg-green-100 flex justify-center items-center">
            <div className="h-5 w-5 rounded-full bg-jg-green-500 ">
              <CheckIcon fill="#fff" />
            </div>
          </div>

          <div>
            <p className="text-[12px] text-[#263238] font-semibold">Yah! Segment is created successfully.</p>
            <p className="text-[12px] text-[#607D8B] font-normal">Go to segment for checking out the updated list.</p>
          </div>
          <div
            onClick={() => {
              setIsError(true)
              setIsLoading(true)
            }}
          >
            <CloseIcon fill="#000" height={20} width={20} />
          </div>
        </div>
      )}
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row flex-wrap px-2 -mt-2">
          <ReportCardItems
            icon={<EmailCheck fill="#607D8B" />}
            title="Delivered"
            reportItem={items.Delivered}
            emailId={items.EmailId}
            activityType={ActivityType.DELIVERY}
            segmentTitle={items.segmentTitle}
            createSegmentSectionOpen={false}
            setCreateSegmentSectionOpen={setCreateSegmentSectionOpen}
          />
          <ReportCardItems
            icon={<EmailOpen fill="#607D8B" />}
            title="Unique open"
            reportItem={items.UniqueOpened}
            emailId={items.EmailId}
            activityType={ActivityType.OPEN}
            segmentTitle={items.segmentTitle}
            createSegmentSectionOpen={createSegmentSectionOpen === ActivityType.OPEN}
            setCreateSegmentSectionOpen={setCreateSegmentSectionOpen}
          />
          <ReportCardItems
            icon={<CursorDefaultClick fill="#607D8B" />}
            title="Unique click"
            reportItem={items.UniqueClicked}
            emailId={items.EmailId}
            activityType={ActivityType.CLICK}
            segmentTitle={items.segmentTitle}
            createSegmentSectionOpen={createSegmentSectionOpen === ActivityType.CLICK}
            setCreateSegmentSectionOpen={setCreateSegmentSectionOpen}
          />
          <ReportCardItems
            icon={<EmailBounceStatus fill="#607D8B" />}
            title="Undelivered"
            reportItem={items.Bounced}
            emailId={items.EmailId}
            activityType={ActivityType.BOUNCED}
            segmentTitle={items.segmentTitle}
            createSegmentSectionOpen={false}
            setCreateSegmentSectionOpen={setCreateSegmentSectionOpen}
          />
        </div>
        {createSegmentSectionOpen !== 0 && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit(values)}
          >
            {({ values, handleChange, setFieldValue, isSubmitting, errors, isValid }) => (
              <Form>
                <div className="border border-jg-grey-200 m-4">
                  <div className="bg-jg-grey-50 border-b border-b-jg-grey-200 text-[14px] font-semibold text-jg-grey-900 p-3">
                    Create New Segment
                  </div>
                  <div className="px-3">
                    <div className="my-3">
                      <label htmlFor="segment-name" className="text-[14px] font-medium text-jg-grey-900">
                        Segment Name
                      </label>
                      <input
                        type="text"
                        id="segmentTitle"
                        name="segmentTitle"
                        value={values.segmentTitle}
                        placeholder="Write a segment name"
                        className={`h-[32px] w-[50%] placeholder-[#78909C] px-2 py-1  placeholder-text-blue-500 placeholder:font-bold${
                          errors.segmentTitle ? '!border-red-500' : 'border-[#CFD8DC]'
                        } block focus:outline-none focus:border focus:border-jg-grey-700 border-[1px] border-[#CFD8DC]`}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="my-2">
                      <label htmlFor="segment-description" className="text-[14px] font-medium text-jg-grey-900">
                        Description
                      </label>
                      <input
                        type="textarea"
                        id="segmentDescription"
                        name="segmentDescription"
                        value={values.segmentDescription}
                        placeholder="Write a segment description"
                        className={`h-[78px] w-[50%] px-2 py-${
                          errors.segmentDescription ? '!border-red-500' : 'border-[#CFD8DC]'
                        } block focus:outline-none focus:border focus:border-jg-grey-700 border-[1px] border-[#CFD8DC]`}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!isValid && isSubmitting}
                      className={`h-8 px-4 my-3 rounded-sm text-[14px] font-medium ${
                        !isValid || isSubmitting ? 'bg-jg-metal-50 text-jg-metal-200' : 'bg-jg-green-500 text-white'
                      }`}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}

        <div className="grid md:grid-cols-2 gap-4 pb-4 pt-1 px-4">
          <div className="w-full flex flex-col">
            <div>
              <div className="box-border flex items-center p-4 h-[48px] bg-[#FAFAFA] border-[1px] border-solid border-[#ECEFF1] justify-start">
                <h1 className="font-Inter font-semibold not-italic text-sm text-[#263238]">{`Real-time Email Data`}</h1>
              </div>
              <div className="bg-[#FFFFFF] border border-t-0 p-3 flex flex-col">
                <div className="flex gap-2 items-center">
                  {/* <div className="w-4 h-4 rounded bg-[#AB47BC]"></div> */}

                  <ReportListItems
                    title="Total delivered"
                    reportItem={items.Delivered}
                    percentage={
                      (items.Bounced === 0 || '0') &&
                      (items.Clicked === 0 || '') &&
                      (items.Delivered === 0 || '') &&
                      (items.Opened === 0 || '') &&
                      (items.UniqueClicked === 0 || '') &&
                      (items.UniqueOpened === 0 || '')
                        ? null
                        : ((items.Delivered / sum) * 100).toFixed(2)
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded bg-[#66BB69]"></div>
                  <ReportListItems
                    title="Unique open"
                    reportItem={items.UniqueOpened}
                    percentage={
                      (items.Bounced === 0 || '0') &&
                      (items.Clicked === 0 || '') &&
                      (items.Delivered === 0 || '') &&
                      (items.Opened === 0 || '') &&
                      (items.UniqueClicked === 0 || '') &&
                      (items.UniqueOpened === 0 || '')
                        ? null
                        : ((items.UniqueOpened / sum) * 100).toFixed(2)
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded bg-[#42A4F5]"></div>
                  <ReportListItems
                    title="Unique click"
                    reportItem={items.UniqueClicked}
                    percentage={
                      (items.Bounced === 0 || '0') &&
                      (items.Clicked === 0 || '') &&
                      (items.Delivered === 0 || '') &&
                      (items.Opened === 0 || '') &&
                      (items.UniqueClicked === 0 || '') &&
                      (items.UniqueOpened === 0 || '')
                        ? null
                        : ((items.UniqueClicked / sum) * 100).toFixed(2)
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded  bg-[#EF5350]"></div>
                  <ReportListItems
                    title="Undelivered"
                    reportItem={items.Bounced}
                    percentage={
                      (items.Bounced === 0 || '0') &&
                      (items.Clicked === 0 || '') &&
                      (items.Delivered === 0 || '') &&
                      (items.Opened === 0 || '') &&
                      (items.UniqueClicked === 0 || '') &&
                      (items.UniqueOpened === 0 || '')
                        ? null
                        : ((items.Bounced / sum) * 100).toFixed(2)
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <ReportListItems
                    title="Total clicked"
                    reportItem={items.Clicked}
                    percentage={
                      (items.Bounced === 0 || '0') &&
                      (items.Clicked === 0 || '') &&
                      (items.Delivered === 0 || '') &&
                      (items.Opened === 0 || '') &&
                      (items.UniqueClicked === 0 || '') &&
                      (items.UniqueOpened === 0 || '')
                        ? null
                        : ((items.Clicked / sum) * 100).toFixed(2)
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <ReportListItems
                    title="Total open"
                    reportItem={items.Opened}
                    percentage={
                      (items.Bounced === 0 || '0') &&
                      (items.Clicked === 0 || '') &&
                      (items.Delivered === 0 || '') &&
                      (items.Opened === 0 || '') &&
                      (items.UniqueClicked === 0 || '') &&
                      (items.UniqueOpened === 0 || '')
                        ? null
                        : ((items.Opened / sum) * 100).toFixed(2)
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <ReportListItems
                    title="Last open"
                    reportItem={
                      items.LastOpened === null
                        ? 'N/A'
                        : `${moment(items.LastOpened).format('ddd DD MMM YYYY, hh:mm A')}`
                    }
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <ReportListItems
                    title="Last click"
                    reportItem={
                      items.LastClicked === null
                        ? 'N/A'
                        : `${moment(items.LastClicked).format('ddd DD MMM YYYY, hh:mm A')}`
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="box-border flex items-center p-4 h-[48px] bg-[#FAFAFA] border-[1px] border-solid border-[#ECEFF1] justify-start">
              <h1 className="font-Inter font-semibold not-italic text-sm text-[#263238]">Email Performance</h1>
            </div>

            <div className="bg-[#FFFFFF] border border-t-0 p-4 flex flex-col h-[321px] overflow-hidden">
              {items && (
                <PyramidChart
                  data={[
                    { category: 'Unique Open', value: items.UniqueOpened ? items.UniqueOpened : 0 },
                    { category: 'Unique Click', value: items.UniqueClicked ? items.UniqueClicked : 0 },
                  ]}
                  PyramidWidth={250}
                  // color={[0xab47bc, 0xef5350, 0x66bb69, 0x42a4f5]}
                  color={[0x66bb69, 0x42a4f5, 0xef5350]}
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-4">
          <div className="box-border flex items-center justify-between p-4 h-[48px] bg-[#FAFAFA] border-[1px] border-solid border-[#ECEFF1]">
            <h1 className="font-Inter font-semibold not-italic text-sm text-[#263238]">Email Activity</h1>
            <ChartFilterWIthDate />
          </div>
          <div className="bg-[#FFFFFF] border border-t-0">
            <div className="border-t-1 border-b-1 border-l-0 border-r-1 border-solid border-[#ECEFF1]">
              {
                <SmoothLineChart
                  /* @ts-ignore */
                  Data={Data ? Data : ChartData}
                  /* @ts-ignore */
                  hide={
                    Data
                      ? Data === null || Data.length < 1
                        ? true
                        : false
                      : ChartData
                      ? ChartData === null || ChartData?.length < 1
                        ? true
                        : false
                      : ''
                  }
                  Tooltipdata={[
                    {
                      toolTipName: 'Delivery Count',
                      chartName: 'DeliveryCount',
                    },
                    {
                      toolTipName: 'Click Count',
                      chartName: 'ClickCount',
                    },
                    {
                      toolTipName: 'Open Count',
                      chartName: 'OpenCount',
                    },
                    {
                      toolTipName: 'Bounced Count',
                      chartName: 'BouncedCount',
                    },
                  ]}
                  color={[0x66bb69, 0xfceb55, 0x66bb69, 0xef5350]}
                />
              }
            </div>
            {Data === null || Data.length < 1 ? null : (
              <div className="mb-5">
                <div className="flex justify-center gap-4 flex-wrap">
                  <div className="flex gap-2 items-center">
                    <div className="w-5 h-1 bg-[#67B7DC]"></div>
                    <p className="text-[13px] text-[#455A64] font-semibold">Deliveries</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-5 h-1 bg-[#fceb55]"></div>
                    <p className="text-[13px] text-[#455A64] font-semibold">Clicked</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-5 h-1 bg-[#66bb69]"></div>
                    <p className="text-[13px] text-[#455A64] font-semibold">Opened</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-5 h-1 bg-[#ef5350]"></div>
                    <p className="text-[13px] text-[#455A64] font-semibold">Bounce</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Report
