import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'

type payload = {
  categoryId?: string
  subCategoryName?: string
  model?: string
}

type ProductResponse = {
  categoryName: string
  categoryId: string
  subCategory: string
  model: string
  hasModel: boolean
  hasSubProducts: boolean
  hasSubCategory: boolean
  hasColors: boolean
  hasDesigns: boolean
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
    id: string
    available: true
  }[]
  designs: {
    colorName: string
    colorId: string
    available: true
    designs: {
      name: string
      availableQuantity: number
      id: string
      available: true
    }[]
  }[]
  productId?: string
  isParentProduct: boolean
}[]

const getAllProducts = (payload: payload) => {
  return getRequest<payload, ProductResponse>({
    url: ApiEndPoints.getProducts,
    payload: payload
  })
}

export const useReturnAllProducts = () => {
  return useMutation({
    mutationFn: getAllProducts,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}
