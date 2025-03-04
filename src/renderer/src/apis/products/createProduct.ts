import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { postRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  categoryName: string
  categoryId: string
  subCategory: string
  model: string
  actionType: string
  hasModel: boolean
  hasSubProducts: boolean
  hasSubCategory: boolean
  hasColors: boolean
  totalQuantity: number
  cartoonsPerSet: number
  subProducts: {
    defaultQuantity: number
    id: string
    name: string
    available: boolean
  }[]
  colors: {
    name: string
    availableQuantity: number
  }[]
  designs: {
    colorName: string
    designs: {
      name: string
      availableQuantity: number
    }[]
  }[]
  productId?: string
}

const createProduct = (payload: payload) => {
  return postRequest<null, payload>({
    url: `${ApiEndPoints.createProduct}`,
    payload: payload
  })
}

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
