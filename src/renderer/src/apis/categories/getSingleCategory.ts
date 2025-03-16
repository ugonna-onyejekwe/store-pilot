import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  id: string
}

export type SingleCategoryResponse = {
  id: string
  name: string
  hasModel: boolean
  hasColors: boolean
  hasSubProducts: boolean
  colors: string[]
  designs: string[]
  subProducts: {
    subCategoryName?: string
    subCategoryId?: string
    name?: string
    defaultQuantity?: number
    id?: string
    subProducts?: {
      name: string
      defaultQuantity: number
      id: string
    }[]
  }[]
  subcategories: { name: string; id: string }[]
  hasSubCategory: boolean
}

const getCategory = (payload: payload) => {
  return getRequest<null, SingleCategoryResponse>({
    url: `${ApiEndPoints.getSingleCategory}/${payload.id}`
  })
}

export const useReturnSingleCategory = () => {
  return useMutation({
    mutationFn: getCategory,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
