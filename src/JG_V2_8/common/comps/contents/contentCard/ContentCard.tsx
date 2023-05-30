import { ContentCardProps } from './ContentCardProps'

function ContentCard(props: ContentCardProps) {
  const {
    heading,
    topRightElement,
    children,
    className = '',
    headingClass = '',
    headingContainerClass = '',
    underlineClass = '', // To change horizontal line, use border-t-* to increase the thickness of the line
    id,
  } = props

  return (
    <div id={id} className={`p-4 border box-border rounded border-solid bg-[#FFFFFF] ${className}`}>
      <div className={`flex items-center justify-between ${headingContainerClass}`}>
        <h2 className={`text-sm font-semibold text-zinc-800 not-italic uppercase ${headingClass}`}>{heading}</h2>
        {topRightElement}
      </div>
      <hr className={`w-6 mt-1 my-2 border-t border-green-500 ${underlineClass}`} />
      {children}
    </div>
  )
}
export default ContentCard
