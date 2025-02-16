import { useReturnAllProducts } from '@renderer/apis/products/getProducts'
import ProductBox from '@renderer/components/productBox'
import { useEffect } from 'react'
import './styles.scss'

const Products = () => {
  const { data: productData, isPending, mutateAsync } = useReturnAllProducts()

  useEffect(() => {
    mutateAsync({})
  }, [])

  return (
    <div className="product_details_container container">
      {/* product container */}
      <div className="products_container">
        {productData?.map((i, key) => <ProductBox data={i} key={key} />)}
      </div>
    </div>
  )
}

export default Products
