import create from 'zustand'
import call from '@jg/_core/services/data/LegacyDataService'

import type {
    GetProducts,
    ProductBalance
} from './type'

const useGetProductBalance = create<ProductBalance>((set) => ({
    balance: null,
    isLoading: false,
    error: '',
    GetProductBalance: async (OwningEntityId: string) => {
        set({ isLoading: true })
        await call(
            ['GDE/FetchObjects'],
            [
                {
                    provider: 'Email',
                    args: {
                        Method: 'GetProductBalance',
                        OwningEntityId,
                    },
                },
            ],
            (response: any) => {
                if (response.StatusCode === 200) {
                    set({ balance: response.Result, isLoading: false })
                } else {
                    set({ isLoading: false, error: 'Something went wrong!' })
                }
            }
        )
    }
}))

const useGetProduct = create<GetProducts>((set) => ({
    products: null,
    isLoading: false,
    error: '',
    GetProducts: async () => {
        set({ isLoading: true })
        await call(
            ['GDE/FetchObjects'],
            [
                {
                    provider: 'Email',
                    args: {
                        Method: 'GetProducts'
                    },
                },
            ],
            (response: any) => {
                if (response.StatusCode === 200) {
                    set({ products: response.Result, isLoading: false })
                } else {
                    set({ isLoading: false, error: 'Something went wrong!' })
                }
            }
        )
    }
}))


export { useGetProductBalance, useGetProduct }
