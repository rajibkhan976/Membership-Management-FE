type TagProps = {
  tags: string[]
}

const SideMenuBodyForTags = ({ tags }: TagProps) => {
  return (
    <>
      {/* <div className="p-2">
        {tags.map((tag, index) => (
          <>
            <Badge
              className="bg-[#FAFAFA] border-[1px] border-jg-metal-100 text-jg-metal-500 font-bold mx-1 my-2"
              fillType="plain"
              label={tag}
              size="md"
              variant="grey"
              rounded={true}
              key={index}
            /> */}
      {/* <div className="inline-block mr-2 mb-3" key={index}>
            <div className="bg-[#FAFAFA] flex gap-1 border border-jg-metal-100 rounded-full items-center px-2 py-1 cursor-pointer text-[13px]font-bold text-jg-metal-500 capitalize">
              {tag}
            </div>
          </div> */}
      {/* </>
        ))}
      </div> */}
      <div className="p-4">
        {tags.map((tag, index) => (
          <div className="inline-block mr-2 mb-3">
            <div className="flex gap-1 border border-jg-metal-500 rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize">
              {tag}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SideMenuBodyForTags
