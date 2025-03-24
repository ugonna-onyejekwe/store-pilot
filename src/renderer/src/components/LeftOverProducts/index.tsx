import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import './styles.scss'

type LeftOverProductsprops = {
  open: boolean
  onOpenChange: (value: boolean) => void
  setOpenSellLeftOverForm: (value: boolean) => void
  setLeftOverProductInfo: (value: SellLeftOverData) => void
  productData: ProductResponse
}

const LeftOverProducts = ({
  open,
  onOpenChange,
  productData,
  setLeftOverProductInfo,
  setOpenSellLeftOverForm
}: LeftOverProductsprops) => {
  // const { leftOver } = productData
  // const [activeProduct, setActiveProduct] = useState<number>(-1)
  // const cartItems = useSelector((state: RootState) => state.cartReducer.cartItems)

  console.log(open, onOpenChange, productData, setLeftOverProductInfo, setOpenSellLeftOverForm)

  return <></>
}

export default LeftOverProducts
