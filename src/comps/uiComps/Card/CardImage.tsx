import classNames from 'classnames'
import { CompBaseProps } from '../_base/types/CompBaseProps'
export type CardImageProps = CompBaseProps & {
  src?: string
  alt?: string
  zoomIn?: boolean
  haveGradient?: boolean
  isCovered?: boolean
  zoomInOut?: string
}

const CardImage = ({
  src,
  alt = 'No image',
  zoomIn = true,
  haveGradient = true,
  className = '',
  isCovered,
  children,
  zoomInOut,
}: CardImageProps) => {
  return (
    <div className={classNames(isCovered != true ? 'relative overflow-hidden z-[1]' : 'relative w-full', className)}>
      <div
        className={classNames(
          zoomIn === true
            ? `transition-all delay-150 duration-500 ease-in-out ${zoomInOut ? zoomInOut : `hover:scale-125`}`
            : ''
        )}
      >
        <div className={isCovered != true ? 'aspect-w-2 aspect-h-1 ' : ''}>
          <img className="object-cover w-full h-full flex-shrink-0 mx-auto" src={src || ''} alt={alt} />
          {haveGradient && (
            <div className="absolute inset-0 bg-gradient-to-t from-jg-grey-900 to-jg-grey-600 opacity-5 z-10"></div>
          )}
        </div>
      </div>
      {children && <div className="absolute left-0 bottom-0 text-white m-4">{children}</div>}
    </div>
  )
}
export default CardImage
