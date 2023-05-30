import CategoryCard from '@jg/widgets/Events/comps/categoryCard/CategoryCard'
import create from 'zustand'
import ArticleCards from '../pages/category/components/ArticleCards'
import CatagoryCards from '../pages/category/components/CatagoryCards'

export const ArticleData = [
  {
    src: 'https://images.unsplash.com/photo-1668545813197-d68b020261dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
    title: 'What happened to Club+?',
    description:
      'Club+ has been rebranded into the awesome new brand you see before you today. It retains all of the same functionality as before but has become uni...',
    // learnMore: true,
    className: '',
    catagoryName: 'Get Strated',
  },
  {
    src: 'https://images.unsplash.com/photo-1668544282309-b398f31b49e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    title: 'How safe is JustGo from a data security a...',
    description:
      'We fully recognise the responsibility we have to provide a secure environment for our customers’ data and understand the sensitivity of the perso...',
    // learnMore: true,
    className: '',
    catagoryName: 'Account Manage',
  },
  {
    src: 'https://images.unsplash.com/photo-1668544282309-b398f31b49e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    title: 'What happened to Club+?',
    description:
      'Club+ has been rebranded into the awesome new brand you see before you today. It retains all of the same functionality as before but has become uni...',
    // learnMore: true,
    className: '',
    catagoryName: 'Billing & Invoices',
  },
  {
    src: 'https://images.unsplash.com/photo-1668544282309-b398f31b49e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    title: 'What happened to Club+?',
    description:
      'Club+ has been rebranded into the awesome new brand you see before you today. It retains all of the same functionality as before but has become uni...',
    // learnMore: true,
    className: '',
    catagoryName: 'Billing & Invoices',
  },
]

export const CatagoryData = [
  {
    src: 'https://images.unsplash.com/photo-1668545813197-d68b020261dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
    title: 'What happened to Club+?',
    description:
      'Club+ has been rebranded into the awesome new brand you see before you today. It retains all of the same functionality as before but has become uni...',
    // learnMore: true,
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1668544282309-b398f31b49e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    title: 'How safe is JustGo from a data security a...',
    description:
      'We fully recognise the responsibility we have to provide a secure environment for our customers’ data and understand the sensitivity of the perso...',
    // learnMore: true,
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1668544282309-b398f31b49e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    title: 'What happened to Club+?',
    description:
      'Club+ has been rebranded into the awesome new brand you see before you today. It retains all of the same functionality as before but has become uni...',
    // learnMore: true,
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1668545813197-d68b020261dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
    title: 'How safe is JustGo from a data security a...',
    description:
      'We fully recognise the responsibility we have to provide a secure environment for our customers’ data and understand the sensitivity of the perso...',
    // learnMore: true,
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1668544282309-b398f31b49e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    title: 'How safe is JustGo from a data security a...',
    description:
      'We fully recognise the responsibility we have to provide a secure environment for our customers’ data and understand the sensitivity of the perso...',
    // learnMore: false,
    className: '',
  },
]
export interface HelpsAndResourcesInfo {
  src?: string
  title?: string
  description?: string
  className?: string
  catagoryName?: string
}
export interface HelpsAndResourcesStorage {
  CategoryCardsInfo: HelpsAndResourcesInfo[]
  ArticleCardsInfo: HelpsAndResourcesInfo[]
}
const useHelpsAndResourcesStorage = create<HelpsAndResourcesStorage>((set, get) => ({
  CategoryCardsInfo: ArticleData,
  ArticleCardsInfo: ArticleData,
}))

export default useHelpsAndResourcesStorage
