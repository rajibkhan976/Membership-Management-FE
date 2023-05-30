import { CompBaseProps } from '@comps/uiComps'
import useShoppingCartAppi from '@jg/common/dataAPIs/shoppingCart'
import { PurchaseItem } from '@jg/common/types'
import { useRouter } from '@jg/hooks'
import { useGlobalNotification } from '@jg/providers/GlobalNotificationProvider'
import AppStore from '@jg/store/store'
import { createContext, useContext } from 'react'

type ShoppingCart = {
  items: PurchaseItem[]
  addItem: (purchaseItem: PurchaseItem) => void
  gotoCart: () => void
}
const defaultShoppingCartCtxValue: ShoppingCart = {
  items: [],
  addItem: function (purchaseItem: PurchaseItem): void {
    throw new Error('Function not implemented.')
  },
  gotoCart: function (): void {
    throw new Error('Function not implemented.')
  },
}

const contextCart = createContext<ShoppingCart>(defaultShoppingCartCtxValue)
export const useShoppingCartContext = () => {
  return useContext(contextCart)
}

const ShoppingCartProvider = ({ children }: CompBaseProps) => {
  const { AddItemsToCartRequest } = useShoppingCartAppi()
  const { notifyLoading } = useGlobalNotification()
  const { esc } = useRouter()
  const IsDev = AppStore((state) => state.IsDev)
  const Provider = contextCart.Provider
  const shoppingCartCtxValue: ShoppingCart = {
    items: [],
    addItem: function (purchaseItem: PurchaseItem): void {
      const exisitng = shoppingCartCtxValue.items.find((item) => {
        return item.ProductId === purchaseItem.ProductId && item.ForEntityId === purchaseItem.ForEntityId
      })
      if (exisitng) {
        exisitng.Quantity = purchaseItem.Quantity
      } else shoppingCartCtxValue.items.push(purchaseItem)
    },
    gotoCart: function (): void {
      notifyLoading('Please wait...', { id: 'cart' })
      // console.log(JSON.parse(shoppingCartCtxValue?.items[0]?.AdditionalData))
      // return
      AddItemsToCartRequest({ items: shoppingCartCtxValue.items }).then(() => {
        //dismiss('cart')
        if (IsDev) location.href = 'http://localhost:60248/Workbench.mvc/Show/9?checkout=2'
        else esc('Workbench.mvc/Show/9?checkout=2')
      })
    },
  }
  return <Provider value={shoppingCartCtxValue}>{children}</Provider>
}

export default ShoppingCartProvider
