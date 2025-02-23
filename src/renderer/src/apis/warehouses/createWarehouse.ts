import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  name: string
}

const addWarehouse = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.addWarehouse}`,
    payload: payload
  })
}

export const useAddWarehouse = () => {
  return useMutation({
    mutationFn: addWarehouse,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
