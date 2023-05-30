import H1 from '../Heading/H1'
import type { EmailNotFoundProps } from './Interfaces'

const EmailNotFound = ({ icon, title, description }: EmailNotFoundProps) => {
  return (
    <div className="flex flex-col mx-auto items-center justify-center py-[10px] px-2 min-h-[calc(100vh-232px)] max-h-[calc(100vh-232px)]">
      <div className="">
        <div className="flex mx-auto items-center justify-center border rounded-[50%]  w-[100px] h-[100px] md:w-[200px] md:h-[200px] bg-jg-grey-100">
          <div>{icon}</div>
        </div>
        <H1 className="text-center text-jg-grey-900 py-2">{title}</H1>
        <p className="text-sm md:text-lg text-center text-jg-grey-600">{description}</p>
      </div>
    </div>
  )
}
export default EmailNotFound
