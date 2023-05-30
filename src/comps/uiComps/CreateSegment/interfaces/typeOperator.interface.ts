export interface TypeOperators {
  DataType: string
  AllowedOperators: AllowedValues[]
}

export interface AllowedValues {
  Value: string
  Caption: string
  AllowedValues?: any[]
}
