import { EditModal } from '@renderer/components/adminEditModal'
import Bot from '@renderer/components/bot'
import { Icons } from '@renderer/components/ui/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const Admin = () => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [actionType, setActionType] = useState<'edit' | 'delete'>('edit')
  return (
    <>
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
            <Link to={'/create-category'}>
              <div className="box">
                <div className="icon_con">
                  <Icons.AddCategory className="icon" />
                </div>

                <h4>Create category</h4>
                <p className="txt">Do you want to create new category to the store?</p>
              </div>
            </Link>

            {/* add product */}
            <Link to={'/add-product'}>
              <div className="box">
                <div className="icon_con">
                  <Icons.AddProductIcon className="icon" />
                </div>

                <h4>Stock product</h4>
                <p className="txt">Do you want to add new product to the store?</p>
              </div>
            </Link>

            {/* edit category */}
            <div
              onClick={() => {
                setOpenEditModal(true)
                setActionType('edit')
              }}
            >
              <div className="box">
                <div className="icon_con">
                  <Icons.EditGoods className="icon" />
                </div>

                <h4>Edit product/category</h4>
                <p className="txt">Do you want to edit a category or product?</p>
              </div>
            </div>

            {/* return product */}
            <Link to={'/returned-goods'}>
              <div className="box">
                <div className="icon_con">
                  <Icons.ReturnedGoods className="icon" />
                </div>

                <h4>Returned product</h4>
                <p className="txt">Do you want to restock returned product?</p>
              </div>
            </Link>

            {/*  store location */}
            <div
              onClick={() => {
                setOpenEditModal(true)
                setActionType('delete')
              }}
            >
              <div className="box ">
                <div className="icon_con">
                  <Icons.LocationIcon className="icon" />
                </div>

                <h4>Configure store location</h4>
                <p className="txt">Do add or delete store location?</p>
              </div>
            </div>

            {/*  auth settings */}
            <div
              onClick={() => {
                setOpenEditModal(true)
                setActionType('delete')
              }}
            >
              <div className="box ">
                <div className="icon_con">
                  <Icons.KeyIcon className="icon" />
                </div>

                <h4>Auth settings</h4>
                <p className="txt">Do you want to change Admin password?</p>
              </div>
            </div>

            {/* Delete product/category */}
            <div
              onClick={() => {
                setOpenEditModal(true)
                setActionType('delete')
              }}
            >
              <div className="box danger_zone">
                <div className="icon_con">
                  <Icons.DeleteIcon className="icon" />
                </div>

                <h4>Delete product/category</h4>
                <p className="txt">Do you want to delete a category or product?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModal open={openEditModal} onOpenChange={setOpenEditModal} actionType={actionType} />
    </>
  )
}

export default Admin
