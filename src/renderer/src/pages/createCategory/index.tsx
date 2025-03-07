import Bot from '@renderer/components/bot'
import { CreateCategoryForm } from '@renderer/components/forms/createCategoryForm'
import { Icons } from '@renderer/components/ui/icons'
import { Link } from 'react-router-dom'
import './styles.scss'

const AddCategory = () => {
  return (
    <>
      {/* back to admin arrow */}
      <div className="container">
        <Link to="/admin" className="back_arrow ">
          <span>
            <Icons.BackArrow className="backarrow_icon" />
          </span>{' '}
          Admin
        </Link>
      </div>

      <div className="enter_category_page container">
        <div className="wrapper">
          <div className="header">
            <div className="bot">
              <Bot />
            </div>
            <h2>Create new product category</h2>
            <p className="subheader txt">Enter category details to get your store ready!</p>
          </div>

          {<CreateCategoryForm />}
        </div>
      </div>
    </>
  )
}

export default AddCategory
