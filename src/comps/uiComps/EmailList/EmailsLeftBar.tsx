import type { EmailLeftBarProps } from '@jg/widgets/EmailAndCom/interfaces/interfaces'

const EmailsLeftBar = ({ sideMenuFilter, selected, items, mainButton }: EmailLeftBarProps) => {

  return (
    <div className="visible hidden lg:block flex-none w-[132px] ml-2 h-full">
      {mainButton && <div className="my-3">{mainButton}</div>}
      {items.map((item, i) => (
        <div className="mt-2" key={i}>
          <button
            onClick={() => sideMenuFilter(item.status)}
            className={`flex flex-row items-center text-sm ${selected === item.status ? 'text-jg-green-500' : 'text-jg-metal-700'
              } active:text-jg-green-500`}
          >
            <span style={{ marginLeft: '-1px', marginRight: '5px' }}>{item.icon}</span>
            {item.title}
          </button>
        </div>
      ))}
    </div>
  )
}

export default EmailsLeftBar
