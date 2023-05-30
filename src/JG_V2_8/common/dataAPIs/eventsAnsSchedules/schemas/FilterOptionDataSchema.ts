export interface FilterOptionDataSchema {
  Categories: {
    DocId: number
    DisplayName: string
    Name: string
    EventCount: number
    SubCategories: { DocId: number; Name: string; EventCount: number }[]
  }[]
  Clubs: {
    DocId: number
    Name: string
    Address: string
    ClubType: string
    IsMyOrganization: number
    EventCount: number
    ClubInternalType: string
  }[]
}
