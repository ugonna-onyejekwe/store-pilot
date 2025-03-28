import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import { useReturnAllProducts } from '@renderer/apis/products/getProducts'
import CategorySideBar from '@renderer/components/CategorySideBar'
import Navbar from '@renderer/components/Navbar'
import ProductBox from '@renderer/components/ProductBox'
import { Icons } from '@renderer/components/ui/icons'
import { ProductLoaders } from '@renderer/components/ui/loader'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './styles.scss'

const Goods = () => {
  const [openCategories, setOpenCategories] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const navigate = useNavigate()

  // from params
  const categoryId = searchParams.get('category')
  const subCategoryId = searchParams.get('subCategoryId')
  const searchValue = searchParams.get('seacrhValue')

  const {
    mutate: getProducts,
    data: allProducts,
    isPending: isGettingProducts
  } = useReturnAllProducts()

  const { CategoriesData } = useGetCategories()
  const { mutate: getSingleCategory, data: selectedCategoryData } = useReturnSingleCategory()

  useEffect(() => {
    getProducts({
      categoryId: categoryId ?? '',
      subCategoryName: subCategoryId ?? ''
      // model: searchValue ?? ''
    })
  }, [categoryId, subCategoryId])

  useEffect(() => {
    if (!categoryId) return
    getSingleCategory({
      id: categoryId!
    })
  }, [categoryId])

  const handleSetParameter = (key: 'category' | 'subCategoryId', id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, id)
    navigate(`?${params.toString()}`)
  }

  const deleteParams = (key: 'category' | 'subCategoryId') => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    navigate(`?${params.toString()}`)
  }

  return (
    <>
      <Navbar currentPage="Goods" />
      <div className="product_details_container container ">
        {/* sidebar        */}
        <CategorySideBar
          open={openCategories}
          onOpenChange={setOpenCategories}
          category={categoryId ?? ''}
        />

        <div className="product_page_wrapper">
          {/* filters & menubtn */}
          <div className="filter_box">
            <span className="menu" onClick={() => setOpenCategories(true)}>
              <Icons.MenuIcon className="meun_icon" />
            </span>

            {!categoryId ? (
              <>
                <span
                  className={!categoryId && !subCategoryId ? 'filter_item active' : 'filter_item'}
                  onClick={() => {
                    deleteParams('category')
                  }}
                >
                  All
                </span>

                {CategoriesData?.map((i, key) => (
                  <span
                    key={key}
                    className={categoryId === i.value ? 'filter_item active' : 'filter_item'}
                    onClick={() => {
                      handleSetParameter('category', i.value)
                    }}
                  >
                    {i.label}
                  </span>
                ))}
              </>
            ) : selectedCategoryData?.hasSubcategories ? (
              <>
                <span
                  className={!subCategoryId ? 'filter_item active' : 'filter_item'}
                  onClick={() => {
                    deleteParams('subCategoryId')
                  }}
                >
                  All
                </span>

                {selectedCategoryData.subcategories.map((i, key) => (
                  <span
                    key={key}
                    className={
                      subCategoryId?.toLowerCase() === i.name.toLowerCase()
                        ? 'filter_item active'
                        : 'filter_item'
                    }
                    onClick={() => handleSetParameter('subCategoryId', i.name)}
                  >
                    {i.name}
                  </span>
                ))}
              </>
            ) : null}
          </div>

          {/* main goods page */}
          {isGettingProducts ? (
            <div className="products_con">
              <ProductLoaders />
            </div>
          ) : allProducts?.length === 0 ? (
            <div className="empty_product">
              <Icons.EmptyIcon className="icon" />
              <h2>No product found</h2>
            </div>
          ) : (
            <div className="products_con">
              {allProducts?.map((product, key) => <ProductBox key={key} data={product} />)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Goods
