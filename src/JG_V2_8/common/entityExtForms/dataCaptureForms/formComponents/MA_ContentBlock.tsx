import { DataCaptureComponentBase } from './MA_Heading'

type DeclarationProps = DataCaptureComponentBase & {
  content?: string
}

export default ({ content }: DeclarationProps) => {
  return <div dangerouslySetInnerHTML={{ __html: content || '' }}></div>
}
