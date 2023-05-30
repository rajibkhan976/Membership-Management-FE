import { Badge, Button } from '@comps/uiComps'
import Card from '@comps/uiComps/Card/Card'
import CardImage from '@comps/uiComps/Card/CardImage'
import { ChevronDoubleRight } from '@comps/uiComps/Icons'
import { ContentSection } from '@jg/common/comps'
import { useNavigate } from 'react-router-dom'

interface ArticleCardArrayType {
  heading?: string
  caption?: string
  imageSrc?: string
}

const articleCardArray: ArticleCardArrayType[] = [
  {
    heading: 'Get What happened to Club+?',
    caption:
      'Club+ has been rebranded into the awesome new brand you see before you today. It retains all of the same functionality as before but has become uni...',
    imageSrc:
      'https://images.unsplash.com/photo-1668587778654-e0babf8483b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMzF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    heading: 'How safe is JustGo from a data security a...',
    caption:
      'We fully recognise the responsibility we have to provide a secure environment for our customers’ data and understand the sensitivity of the perso...',
    imageSrc:
      'https://images.unsplash.com/photo-1668534575280-3ad69fe76c47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    heading: 'What methods of online payments can Ju...',
    caption: 'JustGo supports Credit/Debit cards, and Direct Debit/SEPA.',
    imageSrc:
      'https://images.unsplash.com/photo-1668525834119-bd0860fa8e0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    heading: 'Get What happened to Club+?',
    caption:
      'Club+ has been rebranded into the awesome new brand you see before you today. It retains all of the same functionality as before but has become uni...',
    imageSrc:
      'https://images.unsplash.com/photo-1667845018782-9f5acae511c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  },
  {
    heading: 'How safe is JustGo from a data security a...',
    caption:
      'We fully recognise the responsibility we have to provide a secure environment for our customers’ data and understand the sensitivity of the perso...',
    imageSrc:
      'https://images.unsplash.com/photo-1668475314128-77e400108c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    heading: 'What methods of online payments can Ju...',
    caption: 'JustGo supports Credit/Debit cards, and Direct Debit/SEPA. ',
    imageSrc:
      'https://images.unsplash.com/photo-1668455520578-0847836e48ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
]

const PopularArticleSection = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center bg-[#FAFAFA]">
      <ContentSection
        heading="Popular Articles"
        caption="Explore articles and find your solutions"
        className="bg-[#FAFAFA] min-w-0"
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 max-w-[1200px] w-full mx-auto">
          {articleCardArray.map((data, i) => (
            <div
              key={data.heading || '' + i}
              className="md:max-w-[370px] w-11/12 h-full overflow-hidden rounded relative event-info-card cursor-pointer"
              onClick={() => navigate('article')}
            >
              <CardImage className="cover h-full w-full" haveGradient src={data.imageSrc} zoomIn />
              <div className="p-4 text-left gap-y-1">
                <Badge
                  className="mb-4 !font-medium"
                  fillType="faded"
                  label="Get Started"
                  rounded
                  size="md"
                  variant="primary"
                />
                <div className="text-jg-metal-700 text-base leading-5 font-semibold mb-4 truncate">{data.heading}</div>
                <div className="text-jg-metal-500 text-sm font-normal line-clamp-3 h-[60px]">{data.caption}</div>
                <div className="mt-4 flex items-center text-jg-green-500 text-inputSizeXl font-medium">
                  Learn More <ChevronDoubleRight className="ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center w-auto md:py-6">
          <Button text={'See All Articles'} className="md:mt-3 md:mb-4 mt-3" />
        </div>
      </ContentSection>
    </div>
  )
}

export default PopularArticleSection
