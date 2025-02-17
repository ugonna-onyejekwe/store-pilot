import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import { useEffect } from 'react'
import SellProductForm from '../forms/sellProductForm'
import { ScaleLoaderUI } from '../ui/loader'
import SideSheet from '../ui/sideSheet'
import './styles.scss'

const SellProductModal = ({
  onOpen,
  onOpenChange,
  data
}: {
  onOpen: boolean
  onOpenChange: (value: boolean) => void
  data: ProductResponse
}) => {
  const { data: categoryData, isPending, mutateAsync } = useReturnSingleCategory()

  useEffect(() => {
    mutateAsync({ id: data.category.id })
  }, [data])

  return (
    <SideSheet onOpen={onOpen} onOpenChange={onOpenChange} className="sellProduct_container">
      {isPending ? (
        <ScaleLoaderUI minHeight={700} />
      ) : (
        <>
          <h2>Sell product</h2>
          <p className="subheader_text txt">Enter product details to sell product</p>

          {/* form */}
          <SellProductForm categoryData={categoryData!} productData={data} />
        </>
      )}
    </SideSheet>
  )
}

export default SellProductModal
