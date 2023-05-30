export interface CategoryType {
  name: string
  displayName: string
  imgUrl: string
  articles?: number[]
  CategoryleadImage?: string
  badge?: string[]
}

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

export interface ContentType {
  contentId: string
  type: 'video' | 'pdf' | 'article' | 'guide'
  category: string
  title: string
  body: BodyType
}
