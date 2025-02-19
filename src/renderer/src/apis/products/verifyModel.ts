import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  model: string
  categoryId: string
}

const verifyModelName = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.verifyModelName}`,
    payload: payload
  })
}

export const useVerifyModelName = () => {
  return useMutation({
    mutationFn: verifyModelName,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
