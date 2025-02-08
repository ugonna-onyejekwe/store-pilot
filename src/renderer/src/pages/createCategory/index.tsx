import Bot from '@renderer/components/bot'
import { CreateCategoryForm } from '@renderer/components/forms/createCategoryForm'
import AlertModal from '@renderer/components/ui/alertModal'
import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const AddCategory = () => {
  const [opnSuccessMsgCon, setOpenSuccessMsgCon] = useState(false)

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
        <div className="header">
          <div className="bot">
            <Bot />
          </div>
          <h2>Create new product category</h2>
          <p className="subheader txt">Enter category details to get your store ready!</p>
        </div>

        <CreateCategoryForm setOpenSuccessMsgCon={setOpenSuccessMsgCon} />
      </div>

      <SuccessMsg open={opnSuccessMsgCon} setIsOpen={setOpenSuccessMsgCon} />
    </>
  )
}

export default AddCategory

type SuccessMsgProps = {
  open: boolean
  setIsOpen: (value: boolean) => void
}

const SuccessMsg = ({ open, setIsOpen }: SuccessMsgProps) => {
  return (
    <AlertModal open={open} onOpenChange={setIsOpen}>
      <div className="create_cat_success_con">
        <span className="check_icon_con">
          <Icons.CheckIcon className="check_icon" />
        </span>

        <h4>Product category created successfully</h4>

        <Link to={'/admin'} className="btn">
          <Button text="Go back to admin" />
        </Link>
      </div>
    </AlertModal>
  )
}
