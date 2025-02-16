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
    }).catch((error) => {
      toastUI.error('Product not found')
      navigate('/admin')
    })

    getCategoryData({ id: categoryId! }).catch((error) => {
      toastUI.error('Category not found')
      navigate('/admin')
    })
  }, [productId, categoryId])

  console.log(categoryData, productData)

  const availableSizes = categoryData?.hasSize
    ? productData?.sizes.filter((i) => i.quantity > 0)
    : []
  const availableColors = categoryData?.hasColor
    ? productData?.colors.filter((i) => i.quantity > 0)
    : []
  const availableSubproducts = categoryData?.hasSubProducts
    ? productData?.subProducts.filter((i) => i.available === true)
    : []
  const availableDesigns = categoryData?.hasDesign
    ? productData?.designs.filter((i) => i.quantity > 0)
    : []

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
                    Product category: <span>{productData?.category.name}</span>
                  </p>
                  {categoryData?.hasModel && (
                    <p>
                      Product model: <span>{productData?.model}</span>
                    </p>
                  )}
                  <p>
                    Total available quantity: <span>{productData?.totalQuantity}</span>
                  </p>
                  {categoryData?.hasModel && (
                    <p>
                      cartoons per product: <span>{productData?.cartoonsPerProduct}</span>
                    </p>
                  )}
                </div>

                {categoryData?.hasSize && (
                  <div className="sizes_con">
                    <h3>Available sizes & their quantity</h3>

                    <div className="con">
                      {availableSizes?.length === 0 ? (
                        <p style={{ color: '#e86310' }}>No size is avaliable</p>
                      ) : (
                        availableSizes?.map(
                          (i, key) =>
                            i.quantity !== 0 && (
                              <p key={key}>
                                {i.name}: <span>{i.quantity}</span>
                              </p>
                            )
                        )
                      )}
                    </div>
                  </div>
                )}

                {categoryData?.hasSubProducts && (
                  <div className="subproduct_con">
                    <h3>Available subproducts for this modal</h3>

                    <div className="con">
                      {availableSubproducts?.length === 0 ? (
                        <p style={{ color: '#e86310' }}>No subproduct is avaliable</p>
                      ) : (
                        availableSubproducts?.map((i, key) => (
                          <p key={key}>
                            <span>
                              <Icons.CheckIcon className="check_icon" />
                            </span>{' '}
                            {i.name}
                          </p>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {categoryData?.hasColor && (
                  <div className="subproduct_con">
                    <h3>Available colours & their quantity</h3>

                    <div className="con">
                      {availableColors?.length === 0 ? (
                        <p style={{ color: '#e86310' }}>No color is avaliable</p>
                      ) : (
                        availableColors?.map(
                          (i, key) =>
                            i.quantity !== 0 && (
                              <p key={key}>
                                {i.name}:<span>{i.quantity}</span>{' '}
                              </p>
                            )
                        )
                      )}
                    </div>
                  </div>
                )}

                {categoryData?.hasDesign && (
                  <div className="subproduct_con">
                    <h3>Available designs & their quantity</h3>

                    <div className="con">
                      {availableDesigns?.length === 0 ? (
                        <p style={{ color: '#e86310' }}>No Design is avaliable</p>
                      ) : (
                        availableDesigns?.map(
                          (i, key) =>
                            i.quantity !== 0 && (
                              <p key={key}>
                                {i.name}:<span>{i.quantity}</span>
                              </p>
                            )
                        )
                      )}
                    </div>
                  </div>
                )}
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
    mutateAsync({ productId: productId! })
      .then(() => {
        toastUI.success('Product deleted Successfully')
        onOpenChange(false)
        navigate('/admin')
      })
      .catch((error) => {
        console.log(error)
        toastUI.error('An error occured while deleting product')
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
