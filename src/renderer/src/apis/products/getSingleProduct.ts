import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  categoryId?: string
  productId: string
}

export type ProductResponse = {
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
  isParentProduct: boolean
}

const getSingleProducts = (payload: payload) => {
  return getRequest<null, ProductResponse>({
    url: `${ApiEndPoints.getProducts}/${payload.productId}/${payload.categoryId}`
  })
}

export const useReturnSingleProduct = () => {
  return useMutation({
    mutationFn: getSingleProducts,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
