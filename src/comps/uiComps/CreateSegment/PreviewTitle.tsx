type PreviewTitleProps = {
  title: string
}
const PreviewTitle = ({title}:PreviewTitleProps) => {
  return (
    <div className="pl-4">
      <p className="text-[14px] font-semibold text-jg-metal-700">Segment Preview</p>
      <p className="text-[13px] text-jg-blue-500">{title}</p>
    </div>
  )
}

export default PreviewTitle
