import SellProductForm from '../forms/sellProductForm'
import SideSheet from '../ui/sideSheet'
import './styles.scss'

const SellProductModal = ({
  onOpen,
  onOpenChange
}: {
  onOpen: boolean
  onOpenChange: (value: boolean) => void
}) => {
  return (
    <SideSheet onOpen={onOpen} onOpenChange={onOpenChange} className="sellProduct_container">
      <h2>Sell product</h2>
      <p className="subheader_text txt">Enter product details to sell product</p>

      {/* form */}
      <SellProductForm />
    </SideSheet>
  )
}

export default SellProductModal
