import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import { useDeleteProduct } from '@renderer/apis/products/deleteProduct'
import { useReturnSingleProduct } from '@renderer/apis/products/getSingleProduct'
import AlertModal from '@renderer/components/ui/alertModal'
import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { SummaryLoader } from '@renderer/components/ui/loader'
import { toastUI } from '@renderer/components/ui/toast'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './styles.scss'

const DeleteProduct = () => {
  const { productId, categoryId } = useParams()
  const [openDeleteModel, setOpenDeleteModel] = useState(false)
  const navigate = useNavigate()

  const {
    mutateAsync: getCategoryData,
    data: categoryData,
    isPending: isLoadingCategoryData
  } = useReturnSingleCategory()

  const {
    mutateAsync: getSingleProduct,
    data: productData,
    isPending: gettingSingleProduct
  } = useReturnSingleProduct()

  useEffect(() => {
    getSingleProduct({
      productId: productId!,
      categoryId: categoryId!
    }).catch(() => {
      toastUI.error('Product not found')
      navigate('/admin')
    })

    getCategoryData({ id: categoryId! }).catch(() => {
      toastUI.error('Category not found')
      navigate('/admin')
    })
  }, [productId, categoryId])

  return (
    <>
      <div className="container">
        <Link to="/admin" className="back_arrow ">
          <span>
            <Icons.BackArrow className="backarrow_icon" />
          </span>{' '}
          Admin
        </Link>

        <div className="delete_product_page container">
          {isLoadingCategoryData || gettingSingleProduct ? (
            <SummaryLoader />
          ) : (
            <>
              {' '}
              <h2>Product details</h2>
              <p className="sub_header">
                Here is the summary of the product you want to delete, remember that you can edit
                certain data if necessary
              </p>
              <div className="info_con">
                <div className="general_info_con">
                  <p>
                    Product category: <span>{productData?.categoryName}</span>
                  </p>
                  {categoryData?.hasModel && (
                    <p>
                      Product model: <span>{productData?.model}</span>
                    </p>
                  )}

                  <p>
                    Has model: <span>{categoryData?.hasModel === false ? 'False' : 'True'}</span>
                  </p>

                  <p>
                    cartoons per product: <span>{productData?.cartoonsPerSet}</span>
                  </p>
                  <p>
                    Has sub-category:{' '}
                    <span>{categoryData?.hasSubcategories === true ? 'True' : 'False'}</span>
                  </p>
                  <p>
                    Has colours: <span>{categoryData?.hasColor === true ? 'True' : 'False'}</span>
                  </p>
                  <p>
                    Has designs: <span>{categoryData?.hasColor === true ? 'True' : 'False'}</span>
                  </p>
                </div>
              </div>
              <div className="btn">
                <Link to={`/add-product/edit/${categoryId}/${productId}`}>
                  <Button text="Edit" varient="outline" />
                </Link>
                <Button
                  text="Delete"
                  className="delete_btn"
                  onClick={() => setOpenDeleteModel(true)}
                />
              </div>
            </>
          )}
        </div>

        <DeleteModel open={openDeleteModel} onOpenChange={setOpenDeleteModel} />
      </div>
    </>
  )
}

export default DeleteProduct

const DeleteModel = ({
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
}) => {
  const { productId } = useParams()
  const navigate = useNavigate()

  const { isPending, mutateAsync } = useDeleteProduct()

  const deleteProduct = () => {
    mutateAsync({ productId: productId! }).then(() => {
      toastUI.success('Product deleted Successfully')
      onOpenChange(false)
      navigate('/admin')
    })
  }

  return (
    <AlertModal open={open} onOpenChange={onOpenChange} className="deleteProductModel">
      <h3>Are you sure you wants to delete this product?</h3>

      <div className="btns">
        <Button text="cancel" varient="outline" onClick={() => onOpenChange(false)} />

        <Button
          text="Proceed"
          className="delete_btn"
          onClick={deleteProduct}
          isLoading={isPending}
        />
      </div>
    </AlertModal>
  )
}
