import create from 'zustand'
type emailBodyType = {
    riceTextBody: string
    setBody: (value: string) => void
}
const useEmailBody = create<emailBodyType>((set) => ({
    riceTextBody: '',
    setBody: (value: string) => {
        set({ riceTextBody: value })
    },
}))

export { useEmailBody }
