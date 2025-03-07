import { useReturnAllProducts } from '@renderer/apis/products/getProducts'
import CategorySideBar from '@renderer/components/CategorySideBar'
import Navbar from '@renderer/components/Navbar'
import ProductBox from '@renderer/components/ProductBox'
import { Icons } from '@renderer/components/ui/icons'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import './styles.scss'

const Goods = () => {
  const { data: productData, isPending, mutateAsync } = useReturnAllProducts()
  const { subcatId } = useParams()
  const [params] = useSearchParams()
  const [category, setCategory] = useState('')
  const [openCategories, setOpenCategories] = useState(false)

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

  const productdata = [
    {
      subcategory: 'chair',
      totalQuantity: 100,
      model: '3838',
      colors: ['Red', 'Green', 'Brown', 'Gold'],
      designs: ['S7', 'S2', 'S9']
    },
    {
      subcategory: 'chair',
      totalQuantity: 100,
      model: '3838',
      colors: ['Red', 'Green', 'Brown', 'Gold'],
      designs: ['S7', 'S2', 'S9']
    },
    {
      subcategory: 'chair',
      totalQuantity: 100,
      model: '3838',
      colors: ['Red', 'Green', 'Brown', 'Gold'],
      designs: ['S7', 'S2', 'S9']
    },
    {
      subcategory: 'chair',
      totalQuantity: 100,
      model: '3838',
      colors: ['Red', 'Green', 'Brown', 'Gold'],
      designs: ['S7', 'S2', 'S9']
    },
    {
      subcategory: 'chair',
      totalQuantity: 100,
      model: '3838',
      colors: ['Red', 'Green', 'Brown', 'Gold'],
      designs: ['S7', 'S2', 'S9']
    },
    {
      subcategory: 'chair',
      totalQuantity: 100,
      model: '3838',
      colors: ['Red', 'Green', 'Brown', 'Gold'],
      designs: ['S7', 'S2', 'S9']
    },
    {
      subcategory: 'chair',
      totalQuantity: 100,
      model: '3838',
      colors: ['Red', 'Green', 'Brown', 'Gold'],
      designs: ['S7', 'S2', 'S9']
    },
    {
      subcategory: 'chair',
      totalQuantity: 100,
      model: '3838',
      colors: ['Red', 'Green', 'Brown', 'Gold'],
      designs: ['S7', 'S2', 'S9']
    }
  ]

  return (
    <>
      <Navbar currentPage="Goods" />
      <div className="product_details_container container ">
        {/* sidebar        */}
        <CategorySideBar
          setCategory={setCategory}
          open={openCategories}
          onOpenChange={setOpenCategories}
          category={category}
        />

        <div className="product_page_wrapper">
          {/* filters & menubtn */}
          <div className="filter_box">
            <span className="menu" onClick={() => setOpenCategories(true)}>
              <Icons.MenuIcon className="meun_icon" />
            </span>

            {['all', 'filter 1', 'filter 2', 'filter 3', 'filter 4'].map((i, key) => (
              <span key={key} className="filter_item active ">
                {i}
              </span>
            ))}
          </div>

          {/* main goods page */}
          <div className="products_con">
            {productdata.map((product, key) => (
              <ProductBox key={key} data={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Goods
