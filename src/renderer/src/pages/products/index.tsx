import { useReturnAllProducts } from '@renderer/apis/products/getProducts'
import ProductBox from '@renderer/components/productBox'
import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import './styles.scss'

const Goods = () => {
  const { data: productData, isPending, mutateAsync } = useReturnAllProducts()
  const { subcatId } = useParams()
  const [params] = useSearchParams()

  useEffect(() => {
    const searchValue = params.get('seacrhValue')

    if (searchValue) {
      mutateAsync({
        model: searchValue
      })
    } else {
      mutateAsync({
        categoryId: subcatId
      })
    }
  }, [subcatId, params])

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

export default Goods
