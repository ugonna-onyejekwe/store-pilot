import { addTocart } from '@renderer/store/cartSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input } from '../inputs'
import Button from '../ui/Button'
import SideSheet from '../ui/sideSheet'
import { toastUI } from '../ui/toast'

type SellLeftOverFormProps = {
  data: SellLeftOverData
  open: boolean
  onOpenChange: (value: boolean) => void
}

const SellLeftOverForm = ({ data, open, onOpenChange }: SellLeftOverFormProps) => {
  const dispatch = useDispatch()
  const [sellQuantity, setSellQuantity] = useState<number[]>([])
  const [cartoonQuantity, setCartoonQuantity] = useState<number>()
  useEffect(() => {
    data.subproducts.map((i, index) => {
      sellQuantity[index] = i.left
      setSellQuantity([...sellQuantity])
    })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    if (!cartoonQuantity || cartoonQuantity === 0) return toastUI.error('Enter cartoon quantity')

    const subproductList = data.subproducts.map((i, index) => ({
      ...i,
      sellQuantity: sellQuantity[index]
    }))

    dispatch(
      addTocart({
        category: data.category,
        model: data.model,
        productId: data.productId,
        color: data.color,
        size: data.size,
        design: data.design,
        subproducts: subproductList,
        typeOfSale: 'sell leftOver',
        quantity: 1,
        leftOverId: data.leftOverId,
        cartoonQuantity: cartoonQuantity
      })
    )

    toastUI.success('Product added to cart')

    onOpenChange(false)
  }

  return (
    <SideSheet onOpen={open} onOpenChange={onOpenChange} className="sellLeftOverForm">
      <div className="header">
        <h2>Add to cart</h2>
        <p className="subheader_text txt">Enter product details to add product to cart</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="diable_input">
          <Input
            placeholder="Category"
            label="Product category"
            value={data.category.name}
            onChange={() => {}}
          />
        </div>

        <div className="diable_input">
          <Input
            placeholder="model"
            label="Product  model"
            value={data.model}
            onChange={() => {}}
          />
        </div>

        {data.size && (
          <div className="diable_input">
            <Input placeholder="Size" label="Product size" value={data.size} onChange={() => {}} />
          </div>
        )}

        {data.color && (
          <div className="diable_input">
            <Input
              placeholder="Colour"
              label="Product colour"
              value={data.color}
              onChange={() => {}}
            />
          </div>
        )}

        {data.design && (
          <div className="diable_input">
            <Input
              placeholder="Design"
              label="Product design"
              value={data.design}
              onChange={() => {}}
            />
          </div>
        )}

        <div className="sub_products_box_con">
          <h3>Sub products</h3>
          {data.subproducts.map(({ left, name }, key) => (
            <div key={key} className="box">
              <Input
                label={name}
                value={sellQuantity[key]}
                onChange={(e) => {
                  sellQuantity[key] = e.target.value
                  setSellQuantity([...sellQuantity])
                }}
                onBlur={() => {
                  if (sellQuantity[key] > left) {
                    sellQuantity[key] = left
                    setSellQuantity([...sellQuantity])
                    toastUI.error(`There is only ${left} ${name} left`)
                  }
                  if (sellQuantity[key] < 0) {
                    sellQuantity[key] = 0
                    setSellQuantity([...sellQuantity])
                    toastUI.error(`Value can't be lesss than zero`)
                  }
                }}
                placeholder="Quantity"
                type="number"
              />

              <span className="quantity">{left}</span>
            </div>
          ))}

          <Input
            label="How many cartoons do u think will be supplied for this product?"
            placeholder="Cartoon quantity"
            value={Number(cartoonQuantity)}
            onChange={(e) => setCartoonQuantity(e.target.value)}
            onBlur={(e) => {
              if (e.target.value < 1) {
                setCartoonQuantity(1)
              }
            }}
            type="number"
          />
        </div>

        <div className="btn">
          <Button text="Add to cart" type="submit" />
        </div>
      </form>
    </SideSheet>
  )
}

export default SellLeftOverForm
