import { useCallback } from 'react'

const useScrollToForm = () => {
  const scrollTo = useCallback(
    (
      { bookingItemIndex, indexByMember }: { bookingItemIndex: number; indexByMember?: number },
      callback?: () => void
    ) => {
      setTimeout(() => {
        const el = document.getElementById(
          indexByMember ? `booking-form-${bookingItemIndex}-${indexByMember}` : `booking-form-${bookingItemIndex}`
        )
        if (el) el.scrollIntoView()
        if (callback) callback()
      }, 200)
    },
    []
  )
  return { scrollTo }
}
export default useScrollToForm
