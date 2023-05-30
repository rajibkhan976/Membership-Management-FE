import { Badge, Button } from '@comps/uiComps'
import Card from '@comps/uiComps/Card/Card'
import CardImage from '@comps/uiComps/Card/CardImage'
import { ChevronDoubleRight } from '@comps/uiComps/Icons'
import { ContentSection } from '@jg/common/comps'
import { useNavigate } from 'react-router-dom'

interface imageCardArrayType {
  title: string
  subtitle: string
  imgSrc: string
}

const imageCardArray: imageCardArrayType[] = [
  {
    title: 'Get Started',
    subtitle: '5 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668595473727-7c00beaf98bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMTJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Manage Account',
    subtitle: '10 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668475314128-77e400108c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Billing & Invoices',
    subtitle: '3 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668455520578-0847836e48ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Member Support',
    subtitle: '12 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668437722728-f1ac85caab32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Integration & Automation',
    subtitle: '5 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1659535969472-3f4e2ad3a0be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNzh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Coaching',
    subtitle: '23 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668630285968-fdc7a1b9f3f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Video Tutorials',
    subtitle: '36 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668626317130-02228b116fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Resources',
    subtitle: '7 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668437718856-22873a0cc31b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
]

const CategoriesSection = () => {
  const navigate = useNavigate()
  return (
    <div>
      <ContentSection
        heading="Browse by Category"
        caption="Explore articles and find your solutions"
        className="bg-white"
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 max-w-[1200px] w-full mx-auto">
          {imageCardArray.map((data, i) => (
            // <ImageCard title={data.title} article={data.article} imgSrc={data.imgSrc} className={""} />
            <div
              key={data.title + i}
              className="max-w-[270px] h-[330px] overflow-hidden rounded relative cursor-pointer"
              onClick={() => navigate('category')}
            >
              <CardImage src={data.imgSrc} className="cover h-full w-full" isCovered={true} zoomIn={true}>
                <div className="text-left gap-y-1">
                  <div className="font-semibold leading-5 text-base text-white">{data.title}</div>
                  <div className="leading-4 text-sm text-white">{data.subtitle}</div>
                </div>
              </CardImage>
            </div>
          ))}
        </div>
      </ContentSection>
    </div>
  )
}

export default CategoriesSection
