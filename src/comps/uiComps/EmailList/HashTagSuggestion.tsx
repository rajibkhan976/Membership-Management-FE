import CloseIcon from '@comps/uiComps/Icons/SVG/closeIcon'

type HashTagSuggestionProps = {
  hash: boolean
  emailBody: string
  onClose: () => void
  addHashTag: (value: string) => void
}

const HashTagSuggestion = ({ emailBody, hash, onClose, addHashTag }: HashTagSuggestionProps) => {
  return (
    <>
      <div
        className={`bg-gray-900  ${
          hash ? 'opacity-60' : 'opacity-0'
        } z-10 fixed flex justify-end w-full h-full top-0 left-0`}
      ></div>
      <div
        className={`overflow-y-auto w-full max-w-[416px] h-full bg-white  ${
          hash ? 'fixed top-0 right-0' : 'right-[-100%] '
        } z-20 transition-all`}
      >
        <div className="flex sticky top-0 z-50 bg-white border-b justify-between items-center p-4">
          <div className="">Hash Tag</div>
          <div onClick={onClose} className=" w-6 h-6 cursor-pointer flex items-center justify-center">
            <CloseIcon />
          </div>
        </div>
        <div className="">
          <div className="p-4">
            {['FirstName', 'LastName', 'Address'].map((item, r) => (
              <div key={r} className="inline-block mr-2 mb-3">
                <div className="flex gap-1 border border-jg-metal-500 rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500">
                  <div
                    onClick={(e) => {
                      addHashTag(emailBody + '#' + item)
                    }}
                    className=""
                  >
                    {item}
                  </div>
                  <div className="">
                    <CloseIcon width={16} height={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HashTagSuggestion
