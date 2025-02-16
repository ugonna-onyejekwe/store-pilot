import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { deleteRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  productId: string
}

const deleteProduct = (payload: payload) => {
  return deleteRequest<null, payload>({
    url: `${ApiEndPoints.deleteProduct}/${payload.productId}`
  })
}

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
