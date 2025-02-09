import { useGetSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import Bot from '@renderer/components/bot'
import { CreateCategoryForm } from '@renderer/components/forms/createCategoryForm'
import { Icons } from '@renderer/components/ui/icons'
import { Link, useParams } from 'react-router-dom'
import './styles.scss'

const AddCategory = () => {
  const { actionType, id } = useParams()
  const { data: categoryData, isPending } = useGetSingleCategory(id!)
  const editing = actionType && actionType === 'edit' ? true : false

  return (
    <>
      <div className="container">
        <Link to="/admin" className="back_arrow ">
          <span>
            <Icons.BackArrow className="backarrow_icon" />
          </span>{' '}
          Back
        </Link>
      </div>

      <div className="enter_category_page container">
        <div className="wrapper">
          <div className="header">
            <div className="bot">
              <Bot />
            </div>
            <h2>{editing ? 'Edit product category' : 'Create new product category'}</h2>
            <p className="subheader txt">
              {editing ? 'Edit' : 'Enter'} category details to get your store ready!
            </p>
          </div>

          {isPending || (
            <CreateCategoryForm
              actionType={actionType ? 'edit' : undefined}
              categoryId={id!}
              categoryData={categoryData!}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default AddCategory
