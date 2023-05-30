import ColumnLayout from './ContainerLayouts/LayoutContainer'
import FlexColumns from './FlexContainer/FlexColumns'

const FinderLayout = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 font-mono  text-sm text-center font-bold leading-6 bg-jg-grey-100 rounded-lg">
        <div className="p-4 rounded-lg shadow-lg bg-jg-grey-500">01</div>
        <div className="p-4 rounded-lg shadow-lg bg-jg-grey-500">02</div>
        <div className="p-4 rounded-lg shadow-lg bg-jg-grey-500">03</div>
        <div className="p-4 rounded-lg shadow-lg bg-jg-grey-500">04</div>
        <div className="p-4 rounded-lg shadow-lg bg-jg-grey-500">05</div>
        <div className="p-4 rounded-lg shadow-lg bg-jg-grey-500">06</div>
        <div className="p-4 rounded-lg shadow-lg bg-jg-grey-500">07</div>
        <div className="p-4 rounded-lg shadow-lg bg-jg-grey-500">08</div>
        <div className="p-4 rounded-lg shadow-lg bg-jg-grey-500">09</div>
      </div>
      <div className="grid grid-rows-4 grid-flow-col gap-4 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-pink rounded-lg">
        <div className="p-4 rounded-lg shadow-lg bg-pink-500">01</div>
        <div className="p-4 rounded-lg shadow-lg bg-pink-500">02</div>
        <div className="p-4 rounded-lg shadow-lg bg-pink-500">03</div>
        <div className="p-4 rounded-lg shadow-lg bg-pink-500">04</div>
        <div className="p-4 rounded-lg shadow-lg bg-pink-500">05</div>
        <div className="p-4 rounded-lg shadow-lg bg-pink-500">06</div>
        <div className="p-4 rounded-lg shadow-lg bg-pink-500">07</div>
        <div className="p-4 rounded-lg shadow-lg bg-pink-500">08</div>
      </div>
      <div className="flex gap-0 text-white text-sm font-bold font-mono leading-6 bg-stripes-indigo rounded-lg w-full">
        <div className="w-14 h-14 flex-none rounded-lg flex items-center justify-center bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400">
          01
        </div>
        <div className="p-4 flex-grow rounded-lg flex items-center justify-center bg-indigo-500 shadow-lg">02</div>
        <div className="p-4 w-14 h-14 flex-none rounded-lg flex items-center justify-center bg-indigo-300 dark:bg-indigo-800 dark:text-indigo-400">
          03
        </div>
      </div>
      <div className="jg-container">
        <FlexColumns>
          <div className="p-4 rounded-lg shadow-lg bg-pink-500 flex-none w-[270px]">01</div>
          <div className="p-4 rounded-lg shadow-lg bg-pink-500 flex-1 ">02</div>
        </FlexColumns>
      </div>
    </>
  )
}

export default FinderLayout
