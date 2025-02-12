import Bot from '@renderer/components/bot'
import AddProductForm from '@renderer/components/forms/addProductsForm'
import { Icons } from '@renderer/components/ui/icons'
import { Link, useParams } from 'react-router-dom'
import './styles.scss'

const AddProduct = () => {
  const { actionType, id } = useParams()

  const editing = actionType && actionType === 'edit' ? true : false

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

            <AddProductForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct
