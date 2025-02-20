import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type Product = {
  category: {
    id: string
    name: string
  }
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

type payload = {
  listOfProducts: Product[]
  checkoutInfo: {
    locationSold: string
    customerName: string
    customerPhoneNumber: string
    supplyStatus: 'supplied | not supplied'
    paymentStatus: 'full payment' | 'half payment' | 'credit'
    sellingPrice: number
    amountPaid: number
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
