export type GDEResponse = {
  Message?: string
  Result?: object | any[]
  StatusCode?: number
  Success?: boolean
  ValidationErrors?: string
}

export type GDEResponseNew = {
  Message?: string
  Result?: Res
  StatusCode?: number
  Success?: boolean
  ValidationErrors?: string
}

export type Res = {
  Rows: number
  Segments: any[]
}