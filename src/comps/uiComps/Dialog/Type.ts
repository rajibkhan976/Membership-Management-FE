export type DialogPropsType = {
  open: boolean
  setOpen: (value: boolean) => void
  title?: string
  description?: string
  body?: JSX.Element
  footer?: JSX.Element
}

export type SchedulerSuggestionProps = {
  dateTime?: string
  scheduleTimeHandler?: (value: any) => void
  handleSubmit?: (status: number) => void
  setOpen?: (value: boolean) => void
}
