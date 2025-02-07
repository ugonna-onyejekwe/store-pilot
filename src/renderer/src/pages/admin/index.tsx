import Bot from '@renderer/components/bot'
import { Icons } from '@renderer/components/ui/icons'
import { Link } from 'react-router-dom'
import './styles.scss'

const Admin = () => {
  return (
    <div className="admin_wrapper container">
      <div className="admin_container">
        <div className="bot">
          <Bot />
        </div>
        <h2>
          Welcome to <span>Admin</span>!
        </h2>
        <p className="subheader txt">What would you like to do today?</p>

        <div className="box_con">
          {/* add category */}
          <Link to={'/add-category'}>
            <div className="box">
              <div className="icon_con">
                <Icons.AddCategory className="add_category_icon" />
              </div>

              <h4>Add category</h4>
              <p className="txt">Do you want to add new category to the store?</p>
            </div>
          </Link>

          {/* add product */}
          <Link to={''}>
            <div className="box">
              <div className="icon_con">
                <Icons.AddProductIcon className="add_product_icon" />
              </div>

              <h4>Stock product</h4>
              <p className="txt">Do you want to add new product to the store?</p>
            </div>
          </Link>

          {/* edit category */}
          <Link to={''}>
            <div className="box">
              <div className="icon_con">
                <Icons.EditGoods className="edit_good_icon" />
              </div>

              <h4>Edit product/category</h4>
              <p className="txt">Do you want to edit a category or product?</p>
            </div>
          </Link>

          {/* edit product */}
          <Link to={''}>
            <div className="box">
              <div className="icon_con">
                <Icons.ReturnedGoods className="returned_goods_icon" />
              </div>

              <h4>Returned product</h4>
              <p className="txt">Do you want to restock returned product?</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Admin
