import { ProductResponse } from '@renderer/apis/products/getSingleProduct.js'
import { useEffect, useRef, useState } from 'react'
import LeftOverProducts from '../LeftOverProducts/index.js'
import OutGoingGoods from '../outGoingGoods/index.js'
import ProductDetailsModal from '../productdetailsModal/index.js'
import Button from '../ui/Button/index.js'
import { Icons } from '../ui/icons'
import './styles.scss'

type ProductBoxType = {
  data: ProductResponse
}

const ProductBox = ({ data }: ProductBoxType) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const [isSellingProduct, setIsSellingProduct] = useState(false)
  const dropdownCon = useRef(null)
  const [designObject, setDesignObject] = useState<{
    list: { name: string; quantity: number; id: string }[]
  }>({
    list: []
  })
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [showLeftOver, setShowLeftOver] = useState(false)

  useEffect(() => {
    if (data.hasDesigns === false) {
      designObject.list = []
      setDesignObject(designObject)
      return
    }

    if (designObject.list.length !== 0) return

    data.designs.map((i) => {
      i.designs.map((d) => {
        const exist = designObject.list.find((e) => e.id === d.id)
        if (!exist) {
          designObject.list = [
            ...designObject.list,
            {
              name: d.name,
              id: d.id,
              quantity: d.availableQuantity
            }
          ]

          return
        }

        exist.quantity = Number(exist.quantity) + Number(d.availableQuantity)
        console.log(exist.quantity)

        designObject.list = designObject.list.map((j) => (j.id === exist.id ? exist : j))
        setDesignObject(designObject)
      })
    })
  }, [])

  const clickOutside = (e: any) => {
    // @ts-ignore:undefined
    if (dropdownCon.current?.contains(e.target)) return
    setShowDropDown(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside)
    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [showDropDown])
  return (
    <>
      <div className="product_box">
        <div className="header">
          {data.leftOver && <div className="indicator" />}

          {data.hasSubCategory && <small>{data.subCategory}</small>}

          <div className="dropdown_con" ref={dropdownCon}>
            <div className="wrapper">
              <span onClick={() => setShowDropDown(true)}>
                <Icons.DotMenu className="dot_menu" />
              </span>

              <div className={showDropDown ? 'dropDown active' : 'dropDown'}>
                {
                  <li
                    onClick={() => {
                      setShowDropDown(false)
                      setShowProductDetails(true)
                    }}
                  >
                    View details
                  </li>
                }
                {data.leftOver && (
                  <li
                    onClick={() => {
                      setShowDropDown(false)
                      setShowLeftOver(true)
                    }}
                  >
                    View left over
                  </li>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal_con">
          <span>{data.totalQuantity}</span>
          {data.hasModel && `#${data.model}`}
        </div>

        {data.hasColors && (
          <div className="color_con">
            <h3>Colours:</h3>

            <div className="box_con">
              {data.colors.map((i, key) => (
                <span key={key}>
                  {i.name} {`(${i.availableQuantity})`}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.hasDesigns && (
          <div className="designs_con">
            <h3>Designs:</h3>

            <div className="box_con">
              {designObject.list.map((i, key) => (
                <span key={key}>
                  {i.name} {`(${i.quantity})`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* sell btn */}
        <Button
          className="sell_btn"
          onClick={() => setIsSellingProduct(true)}
          text="
          Sell
    
          "
        />
      </div>

      {isSellingProduct && (
        <OutGoingGoods open={isSellingProduct} onOpenChange={setIsSellingProduct} data={data} />
      )}

      {showProductDetails && (
        <ProductDetailsModal
          open={showProductDetails}
          onOpenChange={setShowProductDetails}
          productData={data}
        />
      )}

      {showLeftOver && (
        <LeftOverProducts open={showLeftOver} onOpenChange={setShowLeftOver} productData={data} />
      )}
    </>
  )
}

export default ProductBox
