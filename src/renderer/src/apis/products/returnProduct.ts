import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  categoryId: string
  productId: string
  subcategory: string
  design: string
  color: string
  subproducts: {
    name: string
    defaultQuantity: number
    id: string
    inputedQuantity: number
  }[]
  returnDisposition: 'restock' | 'discard'
}

const returnProduct = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.returnProduct}`,
    payload: payload
  })
}

export const useReturnProduct = () => {
  return useMutation({
    mutationFn: returnProduct,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
