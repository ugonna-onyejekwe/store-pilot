import { useReturnSingleProduct } from '@renderer/apis/products/getSingleProduct'
import Bot from '@renderer/components/bot'
import AddProductForm from '@renderer/components/forms/addproductsForm'
import { Icons } from '@renderer/components/ui/icons'
import { FormLoader } from '@renderer/components/ui/loader'
import { toastUI } from '@renderer/components/ui/toast'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './styles.scss'

const AddProduct = () => {
  const { actionType, productId, categoryId } = useParams()
  const editing = actionType && actionType === 'edit' ? true : false

  const {
    mutateAsync: getSingleProduct,
    data: productData,
    isPending: gettingSingleProduct
  } = useReturnSingleProduct()

  const navigate = useNavigate()

  useEffect(() => {
    const initData = async () => {
      try {
        await getSingleProduct({
          productId: productId!,
          categoryId: categoryId!
        })
      } catch (error) {
        toastUI.error('Product not found')
        navigate('/admin')
      }
    }

    if (editing) initData()
  }, [editing, productId, categoryId])

  console.log(productData, 'here')

  return (
    <>
      <div className="container">
        <Link to="/admin" className="back_arrow ">
          <span>
            <Icons.BackArrow className="backarrow_icon" />
          </span>{' '}
          Admin
        </Link>

        <div className="add_product_page container">
          <div className="wrapper">
            <div className="header">
              <div className="bot">
                <Bot />
              </div>
              <h2>{editing ? 'Edit product details' : 'Add new product '}</h2>
              <p className="subheader txt">
                {editing ? 'Edit' : 'Enter'} product details to get your store ready!
              </p>
            </div>

            {editing && gettingSingleProduct ? (
              <FormLoader />
            ) : (
              <AddProductForm
                gettingSingleProduct={gettingSingleProduct}
                productData={productData!}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct
