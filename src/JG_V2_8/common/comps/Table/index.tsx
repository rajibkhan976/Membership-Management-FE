import React, { Ref } from 'react'

const Table = (props: React.ComponentProps<'table'>, ref: Ref<HTMLTableElement>) => {
  const { className = '', children, ...rest } = props
  return (
    <table className={'min-w-full divide-y divide-gray-300 ' + className} ref={ref} {...rest}>
      {children}
    </table>
  )
}
export const JGTable = React.forwardRef(Table)

const TableRow = (props: React.ComponentProps<'tr'>, ref: Ref<HTMLTableRowElement>) => {
  const { className = '', children, ...rest } = props
  return (
    <tr className={' ' + className} ref={ref} {...rest}>
      {children}
    </tr>
  )
}

export const TR = React.forwardRef(TableRow)

const TableHeading = (props: React.ComponentProps<'th'>, ref: Ref<HTMLTableHeaderCellElement>) => {
  const { className = '', children, ...rest } = props
  return (
    <th
      className={
        'px-3 py-2 text-left text-[13px] leading-4 font-medium text-jg-metal-700 whitespace-nowrap truncate ' +
        className
      }
      ref={ref}
      {...rest}
    >
      {children}
    </th>
  )
}
export const TH = React.forwardRef(TableHeading)

const TableData = (props: React.ComponentProps<'td'>, ref: Ref<HTMLTableDataCellElement>) => {
  const { className = '', children, ...rest } = props
  return (
    <td
      className={
        'whitespace-nowrap px-3 py-2 text-[13px] leading-4 font-normal text-jg-metal-500 truncate ' + className
      }
      ref={ref}
      {...rest}
    >
      {children}
    </td>
  )
}
export const TD = React.forwardRef(TableData)
