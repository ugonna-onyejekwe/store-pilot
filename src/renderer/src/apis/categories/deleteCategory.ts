import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { deleteRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  categoryId: string
}

const deleteCategory = (payload: payload) => {
  return deleteRequest<null, payload>({
    url: `${ApiEndPoints.deleteCategory}/${payload.categoryId}`
  })
}

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
