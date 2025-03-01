import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  name: string
  hasColor: boolean
  hasSubProducts: boolean
  subProducts: {
    name: string
    defaultQuantity: number
    id?: string
    subProducts?: {
      name: string
      defaultQuantity: number
      id?: string
    }[]
  }[]
  colors: string
  designs: string
  hasModel: boolean
  subcategories: string
  hasSubcategories: boolean
}

const createCategory = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.createCategory}`,
    payload: payload
  })
}

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
