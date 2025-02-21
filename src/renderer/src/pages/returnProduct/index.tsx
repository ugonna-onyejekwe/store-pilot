import Bot from '@renderer/components/bot'
import ReturnProductForm from '@renderer/components/forms/returnProductForm'
import { Icons } from '@renderer/components/ui/icons'
import { Link } from 'react-router-dom'
import './styles.scss'

const ReturnProduct = () => {
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

      <div className="returned_product_page container">
        <div className="wrapper">
          <div className="header">
            <div className="bot">
              <Bot />
            </div>
            <h2>Returned product</h2>
            <p className="subheader txt">Enter details of returned product</p>
          </div>

          <ReturnProductForm />
        </div>
      </div>
    </>
  )
}

export default ReturnProduct
