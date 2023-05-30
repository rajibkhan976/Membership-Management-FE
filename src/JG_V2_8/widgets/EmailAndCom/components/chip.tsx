type ChipComponentProp = {
  title: string
}
const ChipComponent = ({ title }: ChipComponentProp) => {
  return (
    <div className="inline-block mr-2">
      <div className="flex gap-1 border border-jg-metal-500 peer-checked:text-[#4CAF4F]  peer-checked:bg-[#E8F5E9] peer-checked:border-[#A5D6A7] rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize">
        <div className="">{title}</div>
      </div>
    </div>
  )
}

export default ChipComponent
