export type ViewBaseProps = {
  onItemClick?: (event: any, id: number) => void
  onItemOutSideClick?: (event: any) => void
  onItemDetailsClick?: (event: any, id: number) => void
  onShowMoreItemsClick?: (event: any, items: any[]) => void
  onItemMouseEnter?: (event: any, id: number) => void
  onItemMouseLeave?: (event: any, id: number) => void
  getItemCount?: (count: number) => void
  onClickMenuBarIcon?: (status: boolean) => void
  onTodayBtnClick?: () => void
}
