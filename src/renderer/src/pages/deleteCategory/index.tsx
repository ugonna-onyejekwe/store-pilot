import { useDeleteCategory } from '@renderer/apis/categories/deleteCategory'
import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import AlertModal from '@renderer/components/ui/alertModal'
import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { SummaryLoader } from '@renderer/components/ui/loader'
import { toastUI } from '@renderer/components/ui/toast'
import { getError } from '@renderer/lib/utils'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './styles.scss'

export const DeleteCategory = () => {
  const { categoryId } = useParams()
  const [openDeleteModel, setOpenDeleteModel] = useState(false)
  const navigate = useNavigate()

  const {
    mutateAsync: getCategoryData,
    data: categoryData,
    isPending: isLoadingCategoryData
  } = useReturnSingleCategory()

  useEffect(() => {
    getCategoryData({ id: categoryId! }).catch((error) => {
      toastUI.error(getError(error))
      navigate('/admin')
    })
  }, [categoryId])

  return (
    <>
      <div className="container">
        <Link to="/admin" className="back_arrow ">
          <span>
            <Icons.BackArrow className="backarrow_icon" />
          </span>{' '}
          Admin
        </Link>

        <div className="delete_category_page container">
          {isLoadingCategoryData ? (
            <SummaryLoader />
          ) : (
            <>
              {' '}
              <h2>Category details</h2>
              <p className="sub_header">
                Here is the summary of the category you want to delete, remember that you can edit
                certain data if necessary
              </p>
              <div className="info_con_wrapper">
                <div className="general_info_con">
                  <p>
                    Category name: <span> {categoryData?.name}</span>
                  </p>
                  <p>
                    Has model: <span>{categoryData?.hasModel ? 'True' : 'False'}</span>
                  </p>
                  <p>
                    Has sub-categories:{' '}
                    <span>{categoryData?.hasSubcategories ? 'True' : 'False'}</span>
                  </p>
                  <p>
                    Has sub-products: <span>{categoryData?.hasSubProducts ? 'True' : 'False'}</span>
                  </p>
                  <p>
                    Has colours: <span>{categoryData?.hasColor ? 'True' : 'False'}</span>
                  </p>
                </div>
              </div>
              <div className="btn">
                <Link to={`/create-category/edit/${categoryId}`}>
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

        <DeleteCategoryModel open={openDeleteModel} onOpenChange={setOpenDeleteModel} />
      </div>
    </>
  )
}

const DeleteCategoryModel = ({
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
}) => {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  const { isPending, mutateAsync } = useDeleteCategory()

  const deleteProduct = () => {
    mutateAsync({ categoryId: categoryId! })
      .then(() => {
        toastUI.success('category deleted Successfully')
        onOpenChange(false)
        navigate('/admin')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <AlertModal open={open} onOpenChange={onOpenChange} className="deleteCategoryModel">
      <h3>Are you sure you wants to delete this category?</h3>
      <p>{"Remember you can't delete this category if their are still products under it."}</p>

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
