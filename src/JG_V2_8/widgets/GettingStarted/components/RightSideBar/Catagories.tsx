import { ChevronDoubleRight } from '@comps/uiComps/Icons'
import { useWidgetContext } from 'jg-widget'
import { Link, useNavigate } from 'react-router-dom'
import useGettingStartedStore from '../../store/useGettingStarted'

const Catagories = () => {
  const categories = useGettingStartedStore((state) => state.categories)
  const { basePath } = useWidgetContext()

  return (
    <div className="flex flex-col flex-nowrap gap-y-4">
      {categories &&
        categories.length > 0 &&
        categories.map((item: any, index: number) => (
          <Link
            key={index}
            className="flex flex-row items-center text-jg-metal-500 font-medium capitalize !leading-4 text-sm"
            to={`${basePath}${item.name}`}
          >
            <ChevronDoubleRight className="mr-1 h-4 w-4 p-1" /> <span>{item.displayName}</span>
          </Link>
        ))}
    </div>
  )
}
export default Catagories
