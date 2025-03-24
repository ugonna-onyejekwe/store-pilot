import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory.js'
import { ProductResponse } from '@renderer/apis/products/getSingleProduct.js'
import './styles.scss'

type ProductDetailsModal = {
  open: boolean
  onOpenChange: (value: boolean) => void
  categoryData: SingleCategoryResponse
  productData: ProductResponse
}

const ProductDetailsModal = ({
  open,
  onOpenChange,
  categoryData,
  productData
}: ProductDetailsModal) => {
  console.log(open, onOpenChange, categoryData, productData)

  // const availableSizes = categoryData?.hasSize
  //   ? productData.sizes.filter((i) => i.quantity > 0)
  //   : []
  // const availableColor = categoryData?.hasColor
  //   ? productData.colors.filter((i) => i.quantity > 0)
  //   : []
  // const availableDesigns = categoryData?.hasDesign
  //   ? productData.designs.filter((i) => i.quantity > 0)
  //   : []

  return <p>product detail</p>
}

export default ProductDetailsModal
