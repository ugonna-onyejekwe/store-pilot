import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type Product = {
  category: {
    id: string
    name: string
  }
  model: string
  productId: string
  color: string
  size: string
  design: string
  subproducts: {
    name: string
    id: string
    defaultQuantity: number
    left: number
    sellQuantity: number
  }[]
  typeOfSale: 'sell part' | 'sell all' | 'sell leftOver'
  quantity: number
  leftOverId: string
}

export type HistoryResponse = {
  listOfProducts: Product[]
  checkoutInfo: {
    locationSold: string
    customerName: string
    customerPhoneNumber: string
    supplyStatus: 'supplied | not supplied'
    paymentStatus: 'full payment' | 'half payment' | 'credit'
    sellingPrice: number
    amountPaid: number
    createdAt: number
    modified: boolean
    modeifedAt: number
  }
}

type Response = HistoryResponse[]

const getAllHistory = () => {
  return getRequest<null, Response>({
    url: ApiEndPoints.getAllHistory
  })
}

export const useReturnAllHistory = () => {
  return useMutation({
    mutationFn: getAllHistory,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
