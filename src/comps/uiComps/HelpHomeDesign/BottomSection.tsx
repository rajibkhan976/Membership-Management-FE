import Button from '../Button/Button'

export type BottomSectionProps = {
  bottomHeading?: string
  bottomCaption?: string
  btnText?: string
}

const BottomSection = (props: BottomSectionProps) => {
  const { bottomHeading, bottomCaption, btnText } = props
  return (
    <div className="space-y-6 flex flex-col pb-12">
      <div className="text-center space-y-2">
        <h4 className="text-xl leading-6 font-semibold text-jg-metal-900">{bottomHeading}</h4>
        <p className="text-base leading-5 font-normal text-jg-metal-500">{bottomCaption}</p>
      </div>
      {/* @ts-ignore */}
      <Button as="a" href="mailto:support@justgo.com" text={btnText} className="mx-auto" />
    </div>
  )
}

export default BottomSection
