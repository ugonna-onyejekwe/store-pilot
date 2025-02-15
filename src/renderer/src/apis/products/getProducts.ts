import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  categoryId?: string
}

type ProductResponse = {
  category: {
    name: string
    id: string
  }
  totalQuantity: number
  cartoonsPerProduct: number
  model: string
  sizes: { name: string; id: string; quantity: number }[]
  subProducts: {
    name: string
    id: string
    quantity: number
    available: boolean
    defaultQuantity: number
    left: number
  }[]
  colors: { name: string; id: string; quantity: number }[]
  designs: { name: string; id: string; quantity: number }[]
  productId: string
}[]

const getAllProducts = (payload) => {
  return getRequest<payload, ProductResponse>({
    url: ApiEndPoints.getProducts,
    payload: payload
  })
}

export const useReturnAllProducts = () => {
  return useMutation({
    mutationFn: getAllProducts,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
