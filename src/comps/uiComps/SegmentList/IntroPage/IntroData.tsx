import ImageBanner from './ImageBanner'
type IntroDataProps = {
  title: string
}
const IntroData = ({ title }: IntroDataProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full overflow-hidden overflow-y-auto md:min-h-[calc(100vh-230px)] md:max-h-[calc(100vh-230px)] min-h-[calc(100vh-320px)] max-h-[calc(100vh-320px)] flex items-center justify-center">
        <div className="w-full px-2 pb-6">
          <div className="flex justify-center mb-6 pt-4">
            <ImageBanner />
          </div>
          <div className="text-[#263238] text-xl leading-6 font-semibold text-center mb-2">{title}</div>
          <div className="text-[#263238] text-[13px] leading-5 font-normal max-w-[600px] w-full text-center mb-6 mx-auto">
            Get all the juicy history of your sent emails by clicking on "Search"!
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroData
