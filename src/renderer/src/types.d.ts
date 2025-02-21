type InputProps = {
  label?: string
  placeholder: string
  value: string | number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
  errorMsg?: string
  touched?: boolean
  type?: 'text' | 'number' | 'password'
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

type NavbarProps = { setOpenSidebar: (value: boolean) => void; currentPage: string }

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
  hasSize: boolean
  hasColor: boolean
  hasDesign: boolean
  hasSubProducts: boolean
  sizes: string
  subProducts: {
    name: string
    defaultQuantity: number
    id?: string
  }[]
  colors: string
  designs: string
  hasModel: boolean
}

type AddProductDefaultValueTypes = {
  category: string
  model: string
  cartoonQuantity: number
  sizes: { name: string; quantity: number }[]
  subProducts: {
    name: string
    defaultQuantity: number
    available: boolean
  }[]
  colors: { name: string; quantity: number }[]
  designs: { name: string; quantity: number }[]
  colorCustomInputsIndex: number[]
  designCustomInputsIndex: number[]
  sizesCustomInputsIndex: number[]
  totalQuantity: number
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
  size: string
  color: string
  design: string
}
