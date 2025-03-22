import Bot from '@renderer/components/bot'
import AddProductForm from '@renderer/components/forms/addproductsForm'
import Addproduct__ActionModal from '@renderer/components/forms/addproductsForm/Addproduct__ActionModal'
import { Icons } from '@renderer/components/ui/icons'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const AddProduct = () => {
  const [openActionTypeModal, setOpenActionTypeModal] = useState(true)
  const [actionType, setActionType] = useState('')

  useEffect(() => {
    if (actionType === '') setOpenActionTypeModal(true)
  }, [actionType])

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
              <h2>{actionType === 'update' ? 'Update' : 'Create new'} product </h2>
              <p className="subheader txt">Enter product details to get your store ready!</p>
            </div>

            {<AddProductForm actionType={actionType} setOpenActionType={setOpenActionTypeModal} />}
          </div>
        </div>
      </div>

      {/* Modal for action type */}
      {openActionTypeModal && (
        <Addproduct__ActionModal
          open={openActionTypeModal}
          onOpenChange={setOpenActionTypeModal}
          handleSubmit={(formData) => {
            setActionType(formData.actionType)
            setOpenActionTypeModal(false)
          }}
        />
      )}
    </>
  )
}

export default AddProduct
