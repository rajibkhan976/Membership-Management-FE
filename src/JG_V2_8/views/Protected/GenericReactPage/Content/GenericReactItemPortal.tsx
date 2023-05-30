import H1 from '@comps/uiComps/Heading/H1'
export type GenericReactItemPortalProps = {
    heading:string
    bannerImage?:any
    subsCriptionLink?:string
    discount?:string
    code?:string
}

const GenericReactItemPortal = (props:GenericReactItemPortalProps) => {
    const {heading, bannerImage, subsCriptionLink, discount, code} = props
  return (
    <div className='flex justify-center items-center flex-col'>
       <div className='md:max-w-[550px] w-auto py-5'>
       <div>
            <H1 className = 'text-center p-5'>{heading}</H1>
       </div>

       <div className = 'pt-5 pb-10'>
       <a href={subsCriptionLink}>
       <img src={bannerImage} alt={subsCriptionLink} className='w-full object-contain'/>
       </a>
       </div>

       <div>
       <p className = 'text-center px-4'> Register now and watch our on-demand webinar to learn all about the JustGo subscription packages we have to offer. Register here: </p>
       <p className='text-center px-4 py-2'><a href={subsCriptionLink} className="underline text-blue-600 break-all">{subsCriptionLink}</a></p>
       </div>

       <div className='text-center pt-8'>
        <p className = 'inline-block'>Get <b>{discount}</b> off your annual subscription now with code: <b>{code}</b></p>
        <p className='pt-5 px-3 text-xs'>*Simply enter the code at checkout when taking out your Free Trial or paid subscription and the discount will be active for your first payment.</p>
       </div>
       </div>
    </div>
  )
}

export default GenericReactItemPortal

