import { useReturnAllProducts } from '@renderer/apis/products/getProducts'
import ProductBox from '@renderer/components/productBox'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './styles.scss'

const Products = () => {
  const { data: productData, isPending, mutateAsync } = useReturnAllProducts()
  const { subcatId } = useParams()

  useEffect(() => {
    mutateAsync({
      categoryId: subcatId
    })
  }, [subcatId])

  return (
    <div className="product_details_container container">
      {/* product container */}
      {!isPending && (
        <div className="products_container">
          {productData?.map((i, key) => <ProductBox data={i} key={key} />)}
        </div>
      )}
    </div>
  )
}

export default Products
