import { CheckIcon } from '@heroicons/react/outline'
import { ShieldCheckIcon } from '@heroicons/react/solid'
import { EventAdditionalInfoSection } from '@jg/common/types/eventsAnsSchedules/EventInfo'

function AdditionalInfo({ additionalInfo }: { additionalInfo: EventAdditionalInfoSection }) {
  return additionalInfo.sections && additionalInfo.sections.length > 0 ? (
    <>
      {additionalInfo.sections.map(
        (items, index) =>
          (items.contentComp == 'Badge' || items.contentComp == null || items.contentComp == '') && (
            <div key={index} className="p-4 bg-green-50 rounded border space-y-1 border-green-100">
              <div className="inline-flex items-center space-x-1">
                {/* <ShieldCheckIcon className="w-5 h-5 text-jg-green-500" /> */}
                <h4 className="font-semibold mb-2 !text-jg-metal-700  !text-globalTextSizeLg">{items.title}</h4>
              </div>
              <div className="text-sm">
                <span className="text-jg-metal-700">{items.caption}</span>
                {/* <span className="text-jg-green-500 font-medium">Health &amp; Safety Measures</span> */}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {items.contentData.split('|').map((item, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center leading-4 px-3 py-1 rounded-full border border-green-100 bg-white gap-1"
                  >
                    <CheckIcon className="w-5 h-5 text-jg-green-500" />
                    <span className="text-jg-metal-700 text-[13px] leading-4">{item}</span>
                  </div>
                ))}

                {/* ))} */}
              </div>
            </div>
          )
      )}
    </>
  ) : (
    <></>
  )
}

export default AdditionalInfo
