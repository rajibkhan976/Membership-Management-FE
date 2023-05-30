import { useEffect, useState } from 'react'
import { useGetProduct } from '../../store/useProductStore'
import SpinerLoader from '../spinerLoader'
import { useShoppingCartContext } from '@jg/providers/ShoppingCartProvider'
import { useClubSwitcherContext } from '@jg/widgets/ClubSwitcher/ClubSwitcherProvider'
import useGetSelectedClub from '@jg/widgets/ClubSwitcher/store/selectedClube'
import { system } from '@jg/utils/ParentalServices'

const BodySection = () => {
  const club = useGetSelectedClub(({ club }) => club)

  const { addItem, gotoCart } = useShoppingCartContext()
  const { selectedClubDocIdInt } = useClubSwitcherContext()
  const [item, setItem] = useState<{ quantity: number, price: number, docId: number, emails: number, total: number }>({ quantity: 0, price: 0, docId: 0, emails: 0, total: 0 })
  const isLoading = useGetProduct(({ isLoading }) => isLoading)
  const products = useGetProduct(({ products }) => products)
  const GetProducts = useGetProduct(({ GetProducts }) => GetProducts)
  useEffect(() => {
    !products && GetProducts()
  }, [])

  const updateQuantity = (quantity: number, price: number, emails: number, total: number) => {
    setItem({ quantity, price, emails, docId: item.docId, total })
  }


  return (
    <div className="w-full m-2">
      <p className="text-[20px] font-bold text-jg-metal-700 text-center">Efficiently Engage Your Audience for Marketing Success</p>
      {club?.entityType === null ?
        <p className="text-[14px] text-jg-metal-500 text-center">
          Choose the bundle that’s right for you or contact <a href="mailto:sales@justgo.com" className='text-jg-green-500'>sales@justgo.com</a> to upgrade your tier
        </p>
        :
        <p className="text-[14px] text-jg-metal-500 text-center">
          Choose the bundle that’s right for you or <a href="/Workbench/JustGoSubscription" className='text-jg-green-500'>upgrade</a> your JustGo club’s package for even more benefits.
        </p>
      }

      {isLoading ? <div className='flex justify-center mt-[20%]'><SpinerLoader classes='h-8 w-8 border-4 border-dotted border-current' /></div> :
        <div className="flex gap-[10px] mt-8">
          {products && products.map((product, i) => (
            <div key={i}
              className={`border-[1px] ${product.DocId === item.docId ? 'border-jg-green-500' : 'border-jg-metal-50'} rounded-[4px] cursor-pointer`}
            >
              <div
                onClick={() => product.DocId !== item.docId && setItem({ docId: product.DocId, price: 0, total: 0, quantity: 0, emails: 0 })}
              >
                <p className='ml-4 mt-4 text-base font-medium text-[#263238]'>
                  {product.Name}
                </p>

                <p className='ml-4 text-base pt-4'>
                  {system.getCurrency().CurrencySymbol}
                </p>
                <p className='text-4xl ml-8 font-semibold text-[#263238]'>
                  {product.Unitprice.toFixed(2)}
                </p>
                <p
                  className='text-base ml-4 pt-4 font-medium text-jg-green-700 py-2 pr-2'
                >
                  {product.Description}
                </p>
                <hr className="border-t-1 border-jg-metal-50 p-0 mx-auto my-6 w-full" />
              </div>

              <div className="flex justify-between border rounded m-6">
                <button type='button' className={`${product.DocId === item.docId && item.quantity > 0 ? 'bg-jg-green-100 text-jg-green-400' : 'cursor-not-allowed'} py-2 px-4 border-r`} onClick={() => product.DocId === item.docId && item.quantity > 0 ? updateQuantity(item.quantity - 1, product.Unitprice, (product.Size * (item.quantity - 1)), (product.Unitprice * (item.quantity - 1))) : ''}>
                  -
                </button>
                <button type='button' className="py-2 px-4">
                  {product.DocId === item.docId ? item.quantity : 0}
                </button>
                <button type='button' className={`${product.DocId === item.docId ? 'bg-jg-green-100 text-jg-green-400' : 'cursor-not-allowed'} py-2 px-4 border-l`} onClick={() => product.DocId === item.docId ? updateQuantity(item.quantity + 1, product.Unitprice, (product.Size * (item.quantity + 1)), (product.Unitprice * (item.quantity + 1))) : ''}>
                  +
                </button>
              </div>

            </div>
          )
          )}
          <div className="w-1/5 border-[1px] border-jg-metal-50 rounded-[4px]">
            <div className="divide-y">
              <p className="text-1 text-jg-metal-900 font-bold m-2">Summary</p>
              <div className="">
                <div className="flex justify-between m-2">
                  <p className="text-[13px] text-jg-metal-500">Bundle x {item.quantity}</p>
                  <p className="text-[13px] text-jg-metal-900"> {system.getCurrency().CurrencySymbol}
                    {item.quantity < 1 ? '0.00' : item.price.toFixed(2)}</p>
                </div>
                <p className="text-[13px] text-jg-green-500 m-2">{item.emails} {item.emails > 1 ? 'emails' : 'email'}</p>
              </div>
              <div className="flex justify-between p-2">
                <p className="text-1 text-jg-metal-900 font-bold">Total</p>
                <p className="text-1 text-jg-metal-900">  {system.getCurrency().CurrencySymbol}
                  {item.total.toFixed(2)}</p>
              </div>
            </div>
            <p className="text-[12px] text-jg-metal-300 m-2">
              All prices include taxes. Does not apply to transaction fees. You may see an adjustment in the cart based on
              your local tax rate.
            </p>
            <button type='button'
              onClick={() => {
                if (item.quantity > 0) {
                  addItem({
                    ProductId: item.docId,
                    Name: 'Email Bundle',
                    Description: 'Bundle Discription',
                    Quantity: item.quantity,
                    InCart: true,
                    ForEntityType: 'Club',
                    ForEntityId: selectedClubDocIdInt,
                    Tag: "justgo",
                    Group: "just go",
                    AdditionalData: "",
                  })
                  gotoCart()
                }
              }}
              className={`${item.total > 0 ? 'bg-jg-green-500 text-white' : 'bg-jg-grey-200 text-jg-metal-500 cursor-not-allowed'} w-[93%] m-2 p-2 text-bold`}>Add to Cart</button>
          </div>
        </div>
      }
    </div>
  )
}
export default BodySection
