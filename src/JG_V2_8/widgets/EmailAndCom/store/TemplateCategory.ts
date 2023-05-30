import JGFetch from '@jg/common/dataAPIs'
import create from 'zustand'
import { CategoryInfo, IBasicResponse } from './type'

type CategoryInfoArgs = Partial<CategoryInfo> & {
  Action: number
}

interface ITemplateCategories {
  categories: Partial<CategoryInfo>[]
  setCategories: (Category: Partial<CategoryInfo>) => void
  getAllCategories: (OwningEntityId: string) => void
  createCategory: (category: Partial<CategoryInfo>) => void
  updateCategory: (category: Partial<CategoryInfo>) => void
  deleteCategory: (category: number) => void
}

const useTemplateCategory = create<ITemplateCategories>((set, get) => ({
  categories: [],
  setCategories: (category: Partial<CategoryInfo>) => set((state) => ({ categories: [...state.categories, category] })),
  getAllCategories: async (OwningEntityId) => {
    const response = (await getAllCategoriesService(OwningEntityId)) as IBasicResponse<CategoryInfo[]>
    if (!response?.Success) return
    set(() => ({ categories: [...(response?.Result || [])] }))
  },
  createCategory: async (category: Partial<CategoryInfo>) => {
    const categoryArgs = { ...category, Action: 0 }
    const response = (await templateCategoryService(categoryArgs)) as IBasicResponse<CategoryInfo>
    if (!response?.Success) return
    // Some condition required
    set((state) => ({ categories: [...state.categories, response.Result] }))
    console.log(response)
  },
  updateCategory: async (category: Partial<CategoryInfo>) => {
    const categoryArgs = { ...category, Action: 1 }
    const response = (await templateCategoryService(categoryArgs)) as IBasicResponse<CategoryInfo>
    if (!response?.Success) return
    // Some condition required
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.CategoryId === response.Result.CategoryId ? response.Result : cat
      ),
    }))
    console.log(response)
  },
  deleteCategory: async (categoryId: number) => {
    const categoryArgs = { categoryId, Action: 2 }
    const response = (await templateCategoryService(categoryArgs)) as IBasicResponse<Boolean>
    if (!response?.Success) return
    set((state) => ({ categories: state.categories.filter((cat) => cat.CategoryId !== categoryId) }))
    console.log(response)
  },
}))

export default useTemplateCategory

const templateCategoryService = async (categoryArguments: CategoryInfoArgs) => {
  try {
    return JGFetch(
      ['GoMembership/CRUDTemplateCategory'],
      [
        {
          args: categoryArguments,
        },
      ]
    )
  } catch (err: unknown) {
    throw new Error(err as string)
  }
}
const getAllCategoriesService = async (OwningEntityId: string) => {
  try {
    return JGFetch(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email-Template',
          args: { Method: 'GetCategories', OwningEntityId },
        },
      ]
    )
  } catch (err: unknown) {
    throw new Error(err as string)
  }
}
