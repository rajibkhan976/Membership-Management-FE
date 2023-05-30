import JGFetch from '@jg/common/dataAPIs'
import create from 'zustand'
import { EmailTemplateArgs, EmailTemplateInfo, IBasicResponse } from './type'

type EmailTemplateInfoArgs = Partial<EmailTemplateInfo> & {
  Action: number
}

interface IEmailTemplateStore {
  templates: Partial<EmailTemplateInfo>[]
  templatesByCategories: TemplateByCategoryResult[]
  setTemplates: (template: Partial<EmailTemplateInfo>) => void
  getAllTemplates: () => void
  getTemplatesByCategories: (optionalArguments: OptionalArgsTemplateByCategories) => Promise<TemplateByCategoryResult[]>
  createTemplate: (template: EmailTemplateArgs) => void
  updateTemplate: (template: EmailTemplateArgs) => void
  deleteTemplate: (template: number) => void
}

const useEmailTemplateStore = create<IEmailTemplateStore>((set, get) => ({
  templates: [],
  templatesByCategories: [],
  setTemplates: (template: Partial<EmailTemplateInfo>) =>
    set((state) => ({ templates: [...state.templates, template] })),
  getAllTemplates: async () => {
    const response = (await getAllEmailTemplatesService()) as IBasicResponse<EmailTemplateInfo[]>
    if (!response?.Success) return
    set(() => ({ templates: [...(response?.Result || [])] }))
  },
  getTemplatesByCategories: async (optionalArguments?: OptionalArgsTemplateByCategories) => {
    const response = (await getTemplatesByCategories(optionalArguments)) as IBasicResponse<TemplateByCategoryResult[]>
    // if (!response?.Success) return
    set(() => ({ templatesByCategories: response?.Result || [] }))
    return response?.Result || []
  },
  createTemplate: async (template: EmailTemplateArgs) => {
    const templateArgs = { ...template, Action: 0 }
    const response = (await emailTemplateService(templateArgs)) as IBasicResponse<EmailTemplateInfo>
    if (!response?.Success) return
    // Some condition required
    // set((state) => ({ templates: [...state.templates, response.Result] }))
    get().getTemplatesByCategories({ OwningEntityId: template.OwningEntityIdSyncGuid || '' })
  },
  updateTemplate: async (template: EmailTemplateArgs) => {
    const templateArgs = { ...template, Action: 1 }
    const response = (await emailTemplateService(templateArgs)) as IBasicResponse<EmailTemplateInfo>
    if (!response?.Success) return
    // Some condition required
    // set((state) => ({
    //   templates: state.templates.map((temp) =>
    //     temp.TemplateId === response.Result.TemplateId ? response.Result : temp
    //   ),
    // }))
    get().getTemplatesByCategories({ OwningEntityId: template.OwningEntityIdSyncGuid || '' })
  },
  deleteTemplate: async (templateId: number) => {
    const templateArgs = { templateId, Action: 2 }
    const response = (await emailTemplateService(templateArgs)) as IBasicResponse<Boolean>
    if (!response?.Success) return
    // set((state) => ({ templates: state.templates.filter((temp) => temp.TemplateId !== templateId) }))
  },
}))

export default useEmailTemplateStore

const emailTemplateService = async (templateArguments: EmailTemplateInfoArgs) => {
  try {
    return JGFetch(
      ['GoMembership/CRUDEmailTemplate'],
      [
        {
          args: templateArguments,
        },
      ]
    )
  } catch (err: unknown) {
    throw new Error(err as string)
  }
}
const getAllEmailTemplatesService = async () => {
  try {
    return JGFetch(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email-Template',
          args: { Method: 'GetTemplates' },
        },
      ]
    )
  } catch (err: unknown) {
    throw new Error(err as string)
  }
}
const getTemplatesByCategories = async (optionalArguments?: OptionalArgsTemplateByCategories) => {
  try {
    return JGFetch(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email-Template',
          args: { Method: 'GetTemplatesByCategory', ...optionalArguments },
        },
      ]
    )
  } catch (err: unknown) {
    throw new Error(err as string)
  }
}

export interface TemplateByCategoryResult {
  CategoryId: number
  CategoryName: string
  Rows: EmailTemplateInfo[]
}

export type OptionalArgsTemplateByCategories = {
  SearchKey?: string
  CategoryIds?: string // comma separated category id for multiple cat
  Type?: number //0=Free, 1=Premium
  SortBy?: string //date
  OrderBy?: string //desc
  OwningEntityId: string
}
