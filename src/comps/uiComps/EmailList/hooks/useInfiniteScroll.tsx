export const useInfiniteScroll = (ScrollDivId: string, pageNumber: number, setPageNumber: (value: number) => void) => {
  const onScroll = () => {
    const scrollTop = document?.getElementById(ScrollDivId)?.scrollTop
    const scrollHeight = document?.getElementById(ScrollDivId)?.scrollHeight
    const clientHeight = document?.getElementById(ScrollDivId)?.clientHeight
    if (scrollTop && scrollHeight && clientHeight && Math.abs(scrollHeight - clientHeight - scrollTop) <= 1) {
      setPageNumber(pageNumber + 1)
    }
  }

  return { onScroll }
}
