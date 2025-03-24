import { toastUI } from '@renderer/components/ui/toast'
import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import { getRequest } from '@renderer/lib/helpers'
import { getError } from '@renderer/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

export type CategoryResponse = {
  id: string
  name: string
  hasModel: boolean
  hasColor: boolean
  hasDesign: boolean
  hasSubProducts: boolean
  colors: { name: string; id: string }[]
  designs: { name: string; id: string }[]
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
  hasSubcategories: boolean
}[]

const getCategories = () => {
  return getRequest<null, CategoryResponse>({ url: ApiEndPoints.getCategory })
}

export const useReturnAllCategories = () => {
  return useMutation({
    mutationFn: getCategories,
    onError: (error) => {
      toastUI.error(getError(error))
    }
  })
}

export const useGetCategories = () => {
  const { mutateAsync, data, isPending } = useReturnAllCategories()
  useEffect(() => {
    mutateAsync()
  }, [])

  return { CategoriesData: data?.map((i) => ({ label: i.name, value: i.id })), isPending }
}
