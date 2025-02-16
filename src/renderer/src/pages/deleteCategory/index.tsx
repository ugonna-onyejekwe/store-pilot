import { useDeleteCategory } from '@renderer/apis/categories/deleteCategory'
import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import AlertModal from '@renderer/components/ui/alertModal'
import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { SummaryLoader } from '@renderer/components/ui/loader'
import { toastUI } from '@renderer/components/ui/toast'
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
      toastUI.error('Category not found')
      navigate('/admin')
    })

    console.log(categoryData, 'data')
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
              <div className="info_con">
                <div className="general_info">
                  <p>
                    Category name: <span>{categoryData?.name}</span>
                  </p>

                  <p>
                    Has model: <span> {categoryData?.hasModel === true ? 'True' : 'False'}</span>
                  </p>
                </div>

                {categoryData?.hasSize && categoryData.formatedListOfSizes !== '' && (
                  <div className="box_con">
                    <h3>Size under this category</h3>
                    <div className="con">
                      {categoryData?.formatedListOfSizes.split(',').map((i, key) => (
                        <p key={key}>
                          <span>{<Icons.BulletPoint2 className="bullet_icon" />}</span>
                          {i.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {categoryData?.hasColor && categoryData.formatedListOfColors !== '' && (
                  <div className="box_con">
                    <h3>Colours under this category</h3>
                    <div className="con">
                      {categoryData?.formatedListOfColors.split(',').map((i, key) => (
                        <p key={key}>
                          <span>{<Icons.BulletPoint2 className="bullet_icon" />}</span>
                          {i.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {categoryData?.hasDesign && categoryData.formatedListOfDesigns !== '' && (
                  <div className="box_con">
                    <h3>Designs under this category</h3>
                    <div className="con">
                      {categoryData?.formatedListOfDesigns.split(',').map((i, key) => (
                        <p key={key}>
                          <span>{<Icons.BulletPoint2 className="bullet_icon" />}</span>
                          {i.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {categoryData?.hasSubProducts && (
                  <div className="box_con">
                    <h3>SubProducts under this category</h3>
                    <div className="con">
                      {categoryData?.formatedListOfSubproducts.map((i, key) => (
                        <p key={key}>
                          <span>{<Icons.BulletPoint2 className="bullet_icon" />}</span>
                          {i.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
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
        toastUI.error('An error occured while deleting category')
      })
  }

  return (
    <AlertModal open={open} onOpenChange={onOpenChange} className="deleteCategoryModel">
      <h3>Are you sure you wants to delete this category?</h3>
      <p>Remember you can't delete this category if their are still products under it.</p>

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
