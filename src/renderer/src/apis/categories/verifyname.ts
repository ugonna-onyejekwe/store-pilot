import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  categoryName: string
}

const verifyCategoryName = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.verifyCategoryName}`,
    payload: payload
  })
}

export const useVerifyCategoryName = () => {
  return useMutation({
    mutationFn: verifyCategoryName,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
