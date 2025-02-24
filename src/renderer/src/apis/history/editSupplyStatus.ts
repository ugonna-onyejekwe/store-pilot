import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { patchRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  status: string
  checkoutId: string
}

const editSupplyStatus = (payload: payload) => {
  return patchRequest<null, payload>({
    url: `${ApiEndPoints.editSupplyStatus}/${payload.checkoutId}`,
    payload: payload
  })
}

export const useEditSupplyStatus = () => {
  return useMutation({
    mutationFn: editSupplyStatus,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
