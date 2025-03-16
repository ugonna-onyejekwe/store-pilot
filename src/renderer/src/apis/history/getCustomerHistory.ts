import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  customerId: string
}

type Product = {
  categoryId: string
  subcategory: string
  model: string
  productId: string
  subproducts: {
    name: string
    defaultQuantity: number
    id: string
    sellQuantity: number
    left: number
  }[]
  color: string
  design: string
  quantity: number
  hasSubCategory: boolean
  hasModel: boolean
  hasColor: boolean
  hasSubProducts: boolean
  cartoonQuantity: number
  sellType: 'part' | 'all' | 'leftOver'
  leftOverId: string
}

export type HistoryResponse = {
  listOfProducts: Product[]
  checkoutInfo: {
    paymentType: 'full' | 'half' | 'credit'
    amountPaid: string
    amountToPay: string
    customerName: string
    customerId: string
    locationSold: string
    isNewCustomer: boolean
    checkoutId: string
    createdAt: string
  }
}

type Response = HistoryResponse[]

const getcustomerHistory = (payload: payload) => {
  return getRequest<payload, Response>({
    url: ApiEndPoints.customerHistory,
    payload
  })
}

export const useGetCustomerHistory = () => {
  return useMutation({
    mutationFn: getcustomerHistory,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
