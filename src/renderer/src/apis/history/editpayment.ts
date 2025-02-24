import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { patchRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  amountPaid: number
  checkoutId: string
}

const editPayment = (payload: payload) => {
  return patchRequest<null, payload>({
    url: `${ApiEndPoints.editPayment}/${payload.checkoutId}`,
    payload: payload
  })
}

export const useEditPayment = () => {
  return useMutation({
    mutationFn: editPayment,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
