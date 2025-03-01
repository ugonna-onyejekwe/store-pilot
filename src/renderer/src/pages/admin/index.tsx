import AuthModal from '@renderer/components/AdminAuthmodal'
import { EditModal } from '@renderer/components/adminEditModal'
import AdminLinkBox from '@renderer/components/adminLinkBox'
import Bot from '@renderer/components/bot'
import { ConfigStoreModal } from '@renderer/components/ConfigStoreModal'
import Navbar from '@renderer/components/Navbar'
import { Icons } from '@renderer/components/ui/icons'
import { useState } from 'react'
import './styles.scss'

const Admin = () => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [actionType, setActionType] = useState<'edit' | 'delete'>('edit')
  const [openStoreConfigModel, setOpenStoreConfigModel] = useState(false)
  const [openAuth, setOpenAuth] = useState(false)
  return (
    <>
      {/* navbar */}
      <Navbar currentPage="Admin" isSearchable={false} />

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
            <AdminLinkBox
              link={'/create-category'}
              label="Create category"
              subLabel="Do you want to create new category to the store?"
              icon={<Icons.AddCategory className="icon" />}
            />

            {/* add product */}
            <AdminLinkBox
              link={'/add-product'}
              label="Stock product"
              subLabel="Do you want to add new product to the store?"
              icon={<Icons.AddProductIcon className="icon" />}
            />

            {/* edit category */}
            <AdminLinkBox
              handleClick={() => {
                setOpenEditModal(true)
                setActionType('edit')
              }}
              label="Edit product/category"
              subLabel="Do you want to edit a category or product?"
              icon={<Icons.EditGoods className="icon" />}
            />

            {/* return product */}
            <AdminLinkBox
              link={'/returned-goods'}
              label="Returned product"
              subLabel="Do you want to restock returned product?</"
              icon={<Icons.ReturnedGoods className="icon" />}
            />

            {/*  warehouse */}
            <AdminLinkBox
              handleClick={() => {
                setOpenStoreConfigModel(true)
              }}
              label="Configure stores"
              subLabel="Do you want to add or delete store?"
              icon={<Icons.LocationIcon className="icon" />}
            />

            {/*  auth settings */}
            <AdminLinkBox
              handleClick={() => {
                setOpenAuth(true)
              }}
              label="Auth settings"
              subLabel="Do you want to change Admin password?"
              icon={<Icons.KeyIcon className="icon" />}
            />

            {/* Delete product/category */}
            <AdminLinkBox
              handleClick={() => {
                setOpenEditModal(true)
                setActionType('delete')
              }}
              label="Delete product/category"
              subLabel="Do you want to delete a category or product?"
              icon={<Icons.DeleteIcon className="icon" />}
              className="danger_zone"
            />
          </div>
        </div>
      </div>

      <EditModal open={openEditModal} onOpenChange={setOpenEditModal} actionType={actionType} />

      <ConfigStoreModal open={openStoreConfigModel} onOpenChange={setOpenStoreConfigModel} />

      <AuthModal open={openAuth} setOnOPenChange={setOpenAuth} />
    </>
  )
}

export default Admin
