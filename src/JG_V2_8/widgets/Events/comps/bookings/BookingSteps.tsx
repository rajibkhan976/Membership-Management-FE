import classNames from 'classnames'
import React from 'react'
export type BookingStepItem = {
  text?: string
  name?: string
}
export type BookingStepsProps = {
  showProgressTo?: string
  items: BookingStepItem[]
}

export const BookingSteps = (props: BookingStepsProps) => {
  const { items, showProgressTo } = props
  let counterNumber = 1

  const getIndexByProgress = () => {
    let index = -1
    const count = items ? items.length : 0
    for (let i = 0; i < count; i++) {
      const item = items[i]
      if (item.name === showProgressTo) {
        index = i
        break
      }
    }
    return index
  }

  return (
    <div className="flex justify-center w-full px-4 py-3.5 md:p-4">
      {items?.map((item, index) => (
        <div key={index} className={items.length - 1 != index ? 'flex items-center mr-2' : 'flex items-center'}>
          <div>
            <div
              className={classNames(
                getIndexByProgress() >= index
                  ? 'bg-jg-green-50 border border-jg-green-900 md:border-primary-default text-jg-green-900 md:text-primary-default w-6 h-6 md:w-9 md:h-9 rounded-full text-{16px} leading-5 flex justify-center items-center'
                  : 'bg-jg-metal-50 w-6 h-6 md:w-9 md:h-9 border border-jg-metal-100 rounded-full text-jg-metal-500 text-{16px} leading-5 flex justify-center items-center',
                getIndexByProgress() - 1 >= index
                  ? '!bg-jg-green-900 border !border-jg-green-900 md:!border-jg-green-500 md:!bg-jg-green-500 !text-white'
                  : '',
                getIndexByProgress() + 1 <= index ? 'border bg-jg-metal-50' : '',
                index > 0 && item.name == showProgressTo && index != items.length - 1 ? '!bg-jg-green-100' : ''
              )}
            >
              {counterNumber++}
            </div>
          </div>
          <div
            className={classNames(
              showProgressTo != item.name
                ? '!hidden md:!block font-medium leading-4 text-jg-metal-500 pl-1 md:pl-2 text-[14px]'
                : 'pl-1 md:pl-2 font-medium leading-4 !text-jg-metal-900 md:text-jg-metal-500 text-[14px]',
              getIndexByProgress() - 1 >= index ? '!text-jg-green-500' : ''
            )}
          >
            {item.text}
          </div>
          <div className={items.length - 1 == index ? '!hidden' : 'pl-2 h-0.5 w-[48px] md:w-[76px] !block'}>
            <div
              className={classNames(
                getIndexByProgress() >= index && item.name != showProgressTo
                  ? 'w-full h-0.5 bg-jg-green-900 md:bg-jg-green-500 block '
                  : 'w-full block border-dashed border-t border-jg-metal-200',
                index >= 0 && item.name == showProgressTo
                  ? 'md:!border-none md:w-full md:h-0.5 md:block md:!bg-jg-green-100'
                  : ''
              )}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
