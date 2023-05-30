import Tooltip from './Tooltip'

function TooltipWrapper() {
  return (
    <div>
      <main>
        <div className="flex justify-center items-center flex-col mt-6">
          <Tooltip title="Top Tooltip" position="top">
            <span>Top</span>
          </Tooltip>
          <Tooltip title="Right Tooltip" position="right">
            <span>Right</span>
          </Tooltip>
          <Tooltip title="Left tooltip" position="left">
            <span>Left</span>
          </Tooltip>
          <Tooltip title="Bottom Tooltip" position="bottom">
            <span>Bottom</span>
          </Tooltip>
        </div>
      </main>
    </div>
  )
}

export default TooltipWrapper
