import GenericReactItemPortal from "./GenericReactItemPortal"
import BannerImage from '@jg/assets/images/asd.jpg'
import { ResolveClientURL } from "@jg/_core/utils/URL"

const GenericReactPageDemo = () => {

  return (
    <>
    <GenericReactItemPortal heading={"Learn More about JustGo and save on your annual subscription"} bannerImage={ResolveClientURL(BannerImage)} subsCriptionLink={"https://my.demio.com/ref/BTQgLf0aXhSaV2UQ"} discount={" 20% discount*"} code={"JUSTGO23"}/>
    </>
  )
}
export default GenericReactPageDemo
function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.')
}
