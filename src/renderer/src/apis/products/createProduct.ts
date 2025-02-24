import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  categoryId: string
  model: string
  totalQuantity: number
  cartoonsPerProduct: number
  sizes: { name: string; quantity: number }[]
  subProducts: { name: string; available: boolean; defaultQuantity: number }[]
  colors: { name: string; quantity: number }[]
  designs: { name: string; quantity: number }[]
  lastPrice: number
}

const createProduct = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.createProduct}`,
    payload: payload
  })
}

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
