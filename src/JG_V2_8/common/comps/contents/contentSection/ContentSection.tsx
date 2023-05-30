import { H3 } from '@comps/uiComps'
import classNames from 'classnames'
import { ContentSectionProps } from './ContentSectionProps'

function ContentSection(props: ContentSectionProps) {
  const { heading, className, caption, children } = props

  const Cls = classNames(className, 'py-6 sm:py-12')

  return (
    <div className={Cls}>
      <div className="text-center pb-4 sm:pb-6">
        <H3 className="text-globalTextSizeLg sm:text-globalTextSizeXxl font-semibold text-jg-metal-900 mb-1 sm:mb-1.5">
          {heading}
        </H3>
        <h2 className="not-italic font-normal text-jg-metal-500 text-globalTextSizeMd">{caption}</h2>
      </div>
      <div className="jg-container">{children}</div>
    </div>
  )
}
export default ContentSection
