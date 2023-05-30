import { ContentSection } from '@jg/common/comps'
import Badge from '../Badges/Badge'
import Button from '../Button/Button'
import Card from '../Card/Card'
import CardImage from '../Card/CardImage'
import { ChevronDoubleRight } from '../Icons'
import BottomSection from './BottomSection'

export type imageCardArrayProps = {
  imageCardArray: { title: string; subtitle: string; imgSrc: string }[]
  articleCardArray: { heading: string; caption: string; imageSrc: string }[]
}

const HelpHomeDesign = (props: imageCardArrayProps) => {
  const { imageCardArray } = props
  const { articleCardArray } = props
  console.log(imageCardArray)
  return (
    <div className="">
      <ContentSection
        heading="Browse by Category"
        caption="Explore articles and find your solutions"
        className="bg-white"
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 max-w-[1200px] w-full mx-auto">
          {imageCardArray.map((data, i) => (
            // <ImageCard title={data.title} article={data.article} imgSrc={data.imgSrc} className={""} />
            <Card key={data.title + i} className="max-w-[270px] h-[330px] overflow-hidden rounded relative">
              <CardImage src={data.imgSrc} className="cover h-full w-full" isCovered={true} zoomIn={true}>
                <div className="text-left gap-y-1">
                  <div className="font-semibold leading-5 text-base text-white">{data.title}</div>
                  <div className="leading-4 text-sm text-white">{data.subtitle}</div>
                </div>
              </CardImage>
            </Card>
          ))}
        </div>
      </ContentSection>

      <div className="flex justify-center bg-[#FAFAFA]">
        <ContentSection
          heading="Popular Articles"
          caption="Explore articles and find your solutions"
          className="bg-[#FAFAFA]"
        >
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 max-w-[1200px] w-full mx-auto">
            {articleCardArray.map((data) => (
              <Card className="md:max-w-[370px] w-10/12 max-h-[395px] h-full overflow-hidden rounded relative event-info-card">
                <CardImage className="cover h-full w-full" haveGradient src={data.imageSrc} zoomIn />
                <div className="p-4 text-left gap-y-1">
                  <Badge className="mb-4" fillType="faded" label="Get Started" rounded size="md" variant="primary" />
                  <div className="text-jg-metal-700 text-base leading-5 font-semibold mb-4 truncate">
                    {data.heading}
                  </div>
                  <div className="text-jg-metal-500 text-sm font-normal line-clamp-3 h-[60px]">{data.caption}</div>
                  <div className="mt-4 flex items-center text-jg-green-500 text-inputSizeXl font-medium">
                    Learn More <ChevronDoubleRight className="ml-2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center w-auto md:py-6">
            <Button text={'See All Articles'} className="md:mt-3 md:mb-4 mt-3" />
          </div>
        </ContentSection>
      </div>

      <ContentSection className="bg-white">
        <BottomSection
          bottomHeading={"Can't Find What you're Looking for?"}
          bottomCaption={'Feel free to contact us by clicking on the button below'}
          btnText={'Talk to us'}
        />
      </ContentSection>
    </div>
  )
}

export default HelpHomeDesign
