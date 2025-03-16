import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

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
    left?: number
  }[]
  color: string
  design: string
  quantity: number
  hasSubCategory: boolean
  hasModel: boolean
  hasColor: boolean
  hasSubProducts: boolean
  cartoonQuantity: number
  sellType: string
  leftOverId?: string
}

type payload = {
  listOfProducts: Product[]
  checkoutInfo: {
    paymentType: string
    amountPaid: string
    amountToPay: string
    customerName: string
    customerId: string
    locationSold: string
    isNewCustomer: boolean
  }
}

const checkout = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.checkout}`,
    payload: payload
  })
}

export const useCheckout = () => {
  return useMutation({
    mutationFn: checkout,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
