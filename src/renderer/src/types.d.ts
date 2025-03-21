// import { SingleCategoryResponse } from './apis/categories/getSingleCategory'

type InputProps = {
  label?: string
  placeholder: string
  value: string | number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
  errorMsg?: string
  touched?: boolean
  type?: 'text' | 'number' | 'password'
  disabled?: boolean
}

type SelecInputProps = {
  options: {
    value: string | number
    label: string | number
  }[]
  isLoading?: boolean
  label?: string
  onChange: (name: string, value: string | number) => void
  errorMsg?: string
  touched?: boolean
  placeholder: string
  name: string
  id: string
  defaultValue?: string
}

type NavbarProps = {
  currentPage: string
  isDashboard?: boolean
  isSearchable?: boolean
  prevPageLink?: string | null
  openSearch?: (value: boolean) => void
}

type BooleanInputProps = {
  name: string
  label: string
  onChange: (name: string, value: boolean) => void
  value: boolean
  touched?: boolean
  err_msg?: string
}

type CreateCategoryFormInitialvalues = {
  name: string
  hasColor: boolean
  hasSubProducts: boolean
  subProducts: {
    subCategoryName?: string
    name: string
    defaultQuantity: number
    id?: string
    subProducts?: {
      name: string
      defaultQuantity: number
      id?: string
    }[]
  }[]
  hasModel: boolean
  subcategories: string
  hasSubcategories: boolean
  colors: string
  designs: string
}

type SingleCategoryResponse = {
  id: string
  name: string
  hasModel: boolean
  hasColor: boolean
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
}

type AddProductDefaultValueTypes = {
  category: string
  actionType: string
  subcategory: string
  categoryData: SingleCategoryResponse | undefined
  model: string
  subProducts: {
    defaultQuantity: number
    id: string
    name: string
    available: boolean
  }[]
  totalAvailableProduct: number
  cartoonsPerSet: number
  colours: {
    name: string
    availableQuantity: number
    id: string
    available: boolean
  }[]
  designs: {
    colorName: string
    colorId: string
    available: boolean
    designs: {
      name: string
      availableQuantity: number
      id: string
      available: boolean
    }[]
  }[]
}

type SellProductFormValues = {
  category: string
  model: string
  hasModel: boolean
  hasSize: boolean
  hasDesign: boolean
  hasSubProducts: boolean
  color: string
  design: string
  size: string
  quantity: number
  typeOfSale: string
  subproducts: { name: string; defaultQuantity: number; id: string }[]
}

type SellLeftOverData = {
  category: {
    name: string
    id: string
  }
  productId: string
  size: string
  color: string
  design: string
  leftOverId: string
  model: string
  subproducts: {
    name: string
    id: string
    left: number
    defaultQuantity: number
    sellQuantity?: number
  }[]
}

declare type TableProps = {
  columns: ColumnDef<any, any>[]
  data: any[]
  pagination?: {
    hasNextPage: boolean
    hasPreviousPage: boolean
    limit: number
    nextPage: number
    page: number
    totalCount: number
    totalPages: number
  }
  isClickable: boolean
  searchValue?: string
  handleClick?: (value: any) => void
  isLoading: boolean
}

type ReturnedProductType = {
  category: string
  productId: string
  subcategory: string
  color: string
  design: string
  subproducts: {
    name: string
    defaultQuantity: number
    id: string
    inputedQuantity: number
  }[]
  returnDisposition: string
  quantity: number
  categoryData: SingleCategoryResponse | undefined
}

interface sellGoodsModelInitailValueType {
  categoryId: string
  subcategory: string
  model: string
  productId: string
  sellType: string
  subproducts: {
    name: string
    defaultQuantity: number
    id: string
    sellQuantity: number
  }[]
  color: string
  design: string
  quantity: number
  hasSubCategory: boolean
  hasModel: boolean
  hasColor: boolean
  hasSubProducts: boolean
  cartoonQuantity: number
}
