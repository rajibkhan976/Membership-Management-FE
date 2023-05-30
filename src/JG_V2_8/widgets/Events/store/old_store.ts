import create from 'zustand'

const useEventsStore = create((set: any) => ({
  Categories: [
    { Name: 'c1', NavLink: '' },
    { Name: 'c2', NavLink: '' },
    { Name: 'c3', NavLink: '' },
  ],
  SetCategories: (Categories: any) => set(() => ({ Categories })),
  Events: [
    {
      DocId: 1,
      NavLink: '',
      Image: '',
      Name: 'Event1',
      IsFeatured: true,
      Description: 'des',
      Category: 'c1',
      SubCategory: 'c1Sub1',
    },
    {
      DocId: 2,
      NavLink: '',
      Image: '',
      Name: 'Event2',
      IsFeatured: true,
      Description: 'des',
      Category: 'c1',
      SubCategory: 'c1Sub2',
    },
    {
      DocId: 3,
      NavLink: '',
      Image: '',
      Name: 'Event3',
      IsFeatured: true,
      Description: 'des',
      Category: 'c2',
      SubCategory: 'c2Sub1',
    },
    {
      DocId: 4,
      NavLink: '',
      Image: '',
      Name: 'Event4',
      Description: 'des',
      Category: 'c2',
      SubCategory: 'c2Sub2',
    },
  ],
  SetEvents: (Events: any) => set(() => ({ Events })),
}))
export default useEventsStore
