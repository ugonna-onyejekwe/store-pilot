import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { patchRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  model: string
  totalQuantity: number
  cartoonsPerProduct: number
  sizes: { name: string; quantity: number }[]
  subProducts: { name: string; available: boolean; defaultQuantity: number }[]
  colors: { name: string; quantity: number }[]
  designs: { name: string; quantity: number }[]
  productId: string
}

const editProduct = (payload: payload) => {
  return patchRequest<null, payload>({
    url: `${ApiEndPoints.editProduct}`,
    payload: payload
  })
}

export const useEditProduct = () => {
  return useMutation({
    mutationFn: editProduct,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
