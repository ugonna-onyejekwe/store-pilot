import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  name: string
  hasModel: boolean
  hasColors: boolean
  hasDesign: boolean
  hasSubProducts: boolean
  subProducts: {
    subCategoryName?: string
    name?: string
    defaultQuantity?: number
    subProducts?: {
      name: string
      defaultQuantity: number
    }[]
  }[]
  hasSubCategory: boolean
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
