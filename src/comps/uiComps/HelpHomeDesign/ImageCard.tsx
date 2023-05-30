import H1 from '../Heading/H1'
import H2 from '../Heading/H2'

export type ImageCardProps = {
  title: string
  article: number
  imgSrc: string
  className: string
}

const ImageCard = (props: ImageCardProps) => {
  const { title, article, imgSrc } = props
  return (
    <div className="relative w-[270px] h-[330px] p-4 m-4">
      <img src={imgSrc} alt="" className="rounded-md w-full h-full" />
      <H1 className="absolute bottom-4 text-white">{title}</H1>
      <H2 className="absolute bottom-2 text-white">{article}</H2>
    </div>
  )
}

export default ImageCard
