import create from 'zustand'
import categoryImg1 from './categoryImg/categoryImg_1.png'
import categoryImg2 from './categoryImg/categoryImg_2.png'
import categoryImg3 from './categoryImg/categoryImg_3.png'
import categoryImg4 from './categoryImg/categoryImg_4.png'
import categoryImg5 from './categoryImg/categoryImg_5.png'
import categoryImg6 from './categoryImg/categoryImg_6.png'
import categoryImg7 from './categoryImg/categoryImg_7.png'
import categoryImg8 from './categoryImg/categoryImg_8.png'
import categoryImg9 from './categoryImg/categoryImg_9.png'
import categoryImg10 from './categoryImg/categoryImg_10.png'
import categoryImg11 from './categoryImg/categoryImg_11.png'
import categoryImg12 from './categoryImg/categoryImg_12.png'
import categoryImg13 from './categoryImg/categoryImg_13.png'

interface CategoryType {
  name: string
  displayName: string
  categorieCount: number
  imgUrl: string
}
const categorieLocals: CategoryType[] = [
  {
    name: 'Category',
    displayName: 'Getting Started',
    categorieCount: 1,
    imgUrl: categoryImg1,
    // imgUrl: 'https://images.unsplash.com/photo-1668595473727-7c00beaf98bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMTJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Membership',
    categorieCount: 6,
    imgUrl: categoryImg2,
    // imgUrl:      'https://images.unsplash.com/photo-1668475314128-77e400108c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Events',
    categorieCount: 4,
    imgUrl: categoryImg3,
    // imgUrl:      'https://images.unsplash.com/photo-1668455520578-0847836e48ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Email & Communications',
    categorieCount: 4,
    imgUrl: categoryImg4,
    // imgUrl:      'https://images.unsplash.com/photo-1668437722728-f1ac85caab32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Finance & Payments',
    categorieCount: 3,
    imgUrl: categoryImg5,
    // imgUrl:      https://images.unsplash.com/photo-1659535969472-3f4e2ad3a0be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNzh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Website Builder',
    categorieCount: 1,
    imgUrl: categoryImg6,
    // imgUrl:      https://images.unsplash.com/photo-1668630285968-fdc7a1b9f3f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Field Management',
    categorieCount: 4,
    imgUrl: categoryImg7,
    // imgUrl:      https://images.unsplash.com/photo-1668626317130-02228b116fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Club Profile',
    categorieCount: 4,
    imgUrl: categoryImg8,
    // imgUrl:      https://images.unsplash.com/photo-1668437718856-22873a0cc31b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Family',
    categorieCount: 2,
    imgUrl: categoryImg9,
    // imgUrl:      https://images.unsplash.com/photo-1668437722728-f1ac85caab32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Importing Data',
    categorieCount: 1,
    imgUrl: categoryImg10,
    // imgUrl:      https://images.unsplash.com/photo-1659535969472-3f4e2ad3a0be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNzh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Reporting',
    categorieCount: 1,
    imgUrl: categoryImg11,
    // imgUrl:      https://images.unsplash.com/photo-1668630285968-fdc7a1b9f3f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Branding',
    categorieCount: 1,
    imgUrl: categoryImg12,
    // imgUrl:      https://images.unsplash.com/photo-1668626317130-02228b116fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Category',
    displayName: 'Smart Rules',
    categorieCount: 2,
    imgUrl: categoryImg13,
    // imgUrl:      https://images.unsplash.com/photo-1668437718856-22873a0cc31b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
]

type FaqType = {
  title: string
  details: string
}

type BodyType = {
  introText?: string
  videoLink?: string
  pdfLink?: string
  articleBody?: any
  faqBody?: FaqType[]
  tags?: string
}
type ContentType = {
  contentId: string
  type: 'video' | 'pdf' | 'article' | 'guide'
  category: string
  title: string
  body: BodyType
}

const contentsLocal: ContentType[] = [
  {
    contentId: '1',
    type: 'video',
    category: 'Category',
    title: 'title',
    body: {
      introText: 'stringify',
      videoLink: 'string',
      pdfLink: 'string',
      articleBody: 'any',
      faqBody: [
        {
          title: 'string',
          details: 'string',
        },
        {
          title: 'string',
          details: 'string',
        },
      ],
      tags: 'string',
    },
  },
  {
    contentId: '2',
    type: 'pdf',
    category: 'Category',
    title: 'title',
    body: {
      introText: 'stringify',
      videoLink: 'string',
      pdfLink: 'string',
      articleBody: 'any',
      faqBody: [
        {
          title: 'string',
          details: 'string',
        },
        {
          title: 'string',
          details: 'string',
        },
      ],
      tags: 'string',
    },
  },
]

interface GettingStartedStorage {
  categories: CategoryType[]
  contents: ContentType[]
}

const useGettingStartedStore = create<GettingStartedStorage>((set) => ({
  categories: categorieLocals,
  contents: contentsLocal,
}))

export default useGettingStartedStore
