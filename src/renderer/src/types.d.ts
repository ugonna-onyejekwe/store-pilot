type InputProps = {
  label?: string
  placeholder: string
  value: string | number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
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
    quantity: number
    available: boolean
  }[]
  colors: { name: string; quantity: number }[]
  designs: { name: string; quantity: number }[]
  colorCustomInputsIndex: number[]
  designCustomInputsIndex: number[]
  totalQuantity: number
}
