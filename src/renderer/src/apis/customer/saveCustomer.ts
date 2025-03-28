import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  customerName: string
}

const saveCustomer = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.saveCustomers}`,
    payload: payload
  })
}

export const useSaveCustomer = () => {
  return useMutation({
    mutationFn: saveCustomer,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
