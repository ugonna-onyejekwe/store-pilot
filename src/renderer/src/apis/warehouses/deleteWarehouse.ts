import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { deleteRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  id: string
}

const deleteWarehouse = (payload: payload) => {
  return deleteRequest<null, payload>({
    url: `${ApiEndPoints.deleteWarehouse}/${payload.id}`
  })
}

export const useDeleteWarehouse = () => {
  return useMutation({
    mutationFn: deleteWarehouse,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
