import { ResolveClientURL } from '@jg/_core/utils/URL'
import LogoMini from '../images/justgo-mini-transparent.svg'
const LogoButton = () => {
  return <img className="w-8 h-8 m-2" src={ResolveClientURL(LogoMini)} />
}
export default LogoButton
