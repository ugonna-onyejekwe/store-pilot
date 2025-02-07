import Bot from '@renderer/components/bot'
import AddCategoryForm from '@renderer/components/forms/addCategoryForm'
import './styles.scss'

const AddCategory = () => {
  return (
    <div className="enter_category_page container">
      <div className="header">
        <div className="bot">
          <Bot />
        </div>
        <h2>Add new product category to your store</h2>
        <p className="subheader txt">Enter category details to get your store ready!</p>
      </div>

      <AddCategoryForm />
    </div>
  )
}

export default AddCategory
