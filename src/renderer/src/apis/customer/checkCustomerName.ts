import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  customerName: string
}

const checkCustomerName = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.checkCustomer}`,
    payload: payload
  })
}

export const useCheckCustomerName = () => {
  return useMutation({
    mutationFn: checkCustomerName,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
