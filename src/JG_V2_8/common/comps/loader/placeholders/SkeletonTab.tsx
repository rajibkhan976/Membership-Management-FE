import classNames from 'classnames'

type SkeletonTabProps = {
  contentOnly?: boolean
}

const SkeletonTab = (props: SkeletonTabProps) => {
  const { contentOnly } = props

  return (
    <div className="flex flex-col animate-pulse border bg-jg-grey-100">
      <div className={contentOnly ? 'hidden' : 'flex w-full ring-1 ring-white'}>
        <div className="w-20 h-10 bg-jg-metal-50 ring-1 ring-white flex items-center">
          <div className="rounded-sm bg-white w-16 h-5 ml-2"></div>
        </div>
        <div className="w-20 h-10 bg-jg-metal-50 ring-1 ring-white flex items-center">
          <div className="rounded-sm bg-white w-16 h-5 ml-2"></div>
        </div>
        <div className="w-20 h-10 bg-jg-metal-50 ring-1 ring-white flex items-center">
          <div className="rounded-sm bg-white w-16 h-5 ml-2"></div>
        </div>
      </div>
      <div className="w-full h-screen flex">
        <div className="flex flex-col w-6/12">
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
        </div>
        <div className="flex flex-col w-6/12">
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
          <div className="rounded-sm bg-white w-[90%] h-5 mx-auto mt-8"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonTab
