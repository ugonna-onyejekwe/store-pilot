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
  modal: string
  sizes: { name: string; quantity: 0 }[]
  subProducts: { name: string; quantity: 0 }[]
}
