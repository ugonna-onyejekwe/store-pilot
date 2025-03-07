import { useRef, useState } from 'react'
import { Icons } from '../ui/icons'
import './styles.scss'

type ProductBoxType = {
  data: {
    subcategory: string
    totalQuantity: number
    model: string
    colors: string[]
    designs: string[]
  }
}

const ProductBox = ({ data }: ProductBoxType) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const dropdownCon = useRef(null)

  // window.addEventListener('click', (e) => {
  //   if (e.currentTarget === dropdownCon) {
  //     // setShowDropDown(false)
  //     console.log
  //   }

  //   console.log(e.target.currentTarget)
  // })

  return (
    <div className="product_box">
      <div className="header">
        <small>{data.subcategory}</small>

        <div className="dropdown_con" ref={dropdownCon}>
          <span onClick={() => setShowDropDown(true)}>
            <Icons.DotMenu className="dot_menu" />
          </span>

          <div className={showDropDown ? 'dropDown active' : 'dropDown'}>
            <li>View details</li>
            <li>View left over</li>
          </div>
        </div>
      </div>

      <div className="modal_con">
        <span>{data.totalQuantity}</span>#{data.model}
      </div>

      <div className="color_con">
        <h3>Colours:</h3>

        <div className="box_con">
          {data.colors.map((i, key) => (
            <span key={key}>{i}</span>
          ))}
        </div>
      </div>

      <div className="designs_con">
        <h3>Designs:</h3>

        <div className="box_con">
          {data.designs.map((i, key) => (
            <span key={key}>{i}</span>
          ))}
        </div>
      </div>

      {/* sell btn */}
      <button className="sell_btn">Sell</button>
    </div>
  )
}

export default ProductBox
