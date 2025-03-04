import { HistoryResponse, useReturnAllHistory } from '@renderer/apis/history/getHistory'
import { useReturnSingleProduct } from '@renderer/apis/products/getSingleProduct'
import EditPaymentModel from '@renderer/components/EditPaymentModal'
import EditSupplyModel from '@renderer/components/editSupplyModel'
import { Icons } from '@renderer/components/ui/icons'
import { Input } from '@renderer/components/ui/inputs'
import { ScaleLoaderUI } from '@renderer/components/ui/loader'
import { Modal } from '@renderer/components/ui/modal.tsx'
import { DataTable } from '@renderer/components/ui/table'
import { History_column } from '@renderer/components/ui/table/columns/hsitoryColumn'
import { convertAmount, formatDate } from '@renderer/lib/utils'
import { useEffect, useState } from 'react'
import './styles.scss'

const History = () => {
  const { isPending, data: history, mutate } = useReturnAllHistory()
  const [searchValue, setSearchValue] = useState('')
  const [date, setDate] = useState('')
  const [filteredHistory, setFilteredHistory] = useState<HistoryResponse[]>([])
  const [rowData, setRowData] = useState<HistoryResponse>()
  const [openDetails, setOpenDetails] = useState(false)

  // fetch data
  useEffect(() => {
    mutate()
  }, [])

  useEffect(() => {
    if (date) {
      const targetDate = new Date(date)
      const startOfDay = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        targetDate.getDate()
      )
      const endOfDay = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        targetDate.getDate() + 1
      )

      const list = history?.filter(
        (i) =>
          new Date(i.checkoutInfo.createdAt) >= startOfDay &&
          new Date(i.checkoutInfo.createdAt) < endOfDay
      )

      setFilteredHistory(list ?? [])
    }
  }, [date])

  useEffect(() => {
    setOpenDetails(false)
  }, [history])

  return (
    <div className="container history_page">
      <div className="filter_con">
        <div className="search_con">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>

        <div className="date_con">
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <DataTable
        columns={History_column}
        isLoading={isPending}
        data={date ? filteredHistory : (history ?? [])}
        isClickable
        searchValue={searchValue}
        handleClick={(rowData) => {
          setRowData(rowData)
          setOpenDetails(true)
        }}
      />

      <RowDetails
        open={openDetails}
        onOpenChange={setOpenDetails}
        data={rowData!}
        refetchHistory={mutate}
      />
    </div>
  )
}

export default History

type RowDetailsProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  data: HistoryResponse
  refetchHistory: () => void
}

const RowDetails = ({ open, onOpenChange, data, refetchHistory }: RowDetailsProps) => {
  if (!data) return null
  const [openEditSupplyModel, setOpenEditSupplyModel] = useState(false)
  const [openEditPaymentModel, setOpenEditPaymentModel] = useState(false)
  const [ActiveHistory, setActiveHistory] = useState<HistoryResponse>()
  const [activeCheckoutId, setActiveCheckoutId] = useState('')

  return (
    <>
      <Modal open={open} onOpenChange={onOpenChange}>
        <div className="details_con">
          <div className="header">
            <h2>Details</h2>
            <p>
              {' '}
              Viewing Details of <b>{data.checkoutInfo.customerName}</b>{' '}
            </p>
          </div>

          <div className="info_con">
            <p>
              Customer name: <span>{data.checkoutInfo.customerName}</span>
            </p>
            <p>
              Customer phone number:{' '}
              <span>{data.checkoutInfo.customerPhoneNumber || 'Not provided'}</span>
            </p>

            <p>
              Store where product is sold: <span>{data.checkoutInfo.locationSold}</span>
            </p>

            <p>
              Date of checkout: <span>{formatDate(data.checkoutInfo.createdAt)}</span>
            </p>
            {data.checkoutInfo.modified && (
              <p>
                Modified at: <span>{formatDate(data.checkoutInfo.modeifedAt)}</span>
              </p>
            )}
          </div>

          {/* supply details */}
          <div className="status_con">
            <h3>Supply Details</h3>

            <div className="box">
              <p>
                Supply location: <span>{data.checkoutInfo.supplyLocation || 'Not specified'}</span>
              </p>

              <div className="btns">
                <span
                  className={'status ' + 'status__' + data.checkoutInfo.supplyStatus.toLowerCase()}
                >
                  {data.checkoutInfo.supplyStatus}
                </span>

                <span
                  className="edit_con"
                  onClick={() => {
                    setActiveCheckoutId(data.checkoutInfo.checkoutId)
                    setOpenEditSupplyModel(true)
                    console.log('yes')
                  }}
                >
                  <Icons.EditIcon className="editIcon" />
                </span>
              </div>
            </div>
          </div>

          {/* payment detials */}
          <div className="status_con">
            <h3>Payment Details</h3>

            <div className="box">
              <p>
                Checkout price: <span>{convertAmount(Number(data.checkoutInfo.sellingPrice))}</span>
              </p>

              <p>
                Amount paid:{' '}
                <span>
                  {data.checkoutInfo.paymentStatus.toLowerCase() === 'full payment'
                    ? convertAmount(data.checkoutInfo.sellingPrice)
                    : convertAmount(Number(data.checkoutInfo.amountPaid))}
                </span>
              </p>

              <p>
                Amount left to pay:{' '}
                <span>
                  {data.checkoutInfo.paymentStatus.toLowerCase() === 'full payment'
                    ? convertAmount(0)
                    : convertAmount(
                        Number(data.checkoutInfo.sellingPrice) -
                          Number(data.checkoutInfo.amountPaid)
                      )}
                </span>
              </p>

              <div className="btns">
                <span
                  className={'status ' + 'status__' + data.checkoutInfo.paymentStatus.toLowerCase()}
                >
                  {data.checkoutInfo.paymentStatus}
                </span>

                {data.checkoutInfo.paymentStatus.toLowerCase() !== 'full payment' && (
                  <span
                    className="edit_con"
                    onClick={() => {
                      setActiveHistory(data)
                      setOpenEditPaymentModel(true)
                    }}
                  >
                    <Icons.EditIcon className="editIcon" />
                  </span>
                )}
              </div>
            </div>
          </div>

          {data.listOfProducts.length > 0 && (
            <div className="goods_section">
              <h3>Goods bought</h3>

              <div className="box_con">
                {data.listOfProducts.map((i, key) => (
                  // @ts-expect-error: undefined
                  <ProductBox key={key} {...i} />
                ))}
              </div>
            </div>
          )}

          <div className="action_section">
            <div className="box"></div>
          </div>
        </div>
      </Modal>

      {openEditSupplyModel && (
        <EditSupplyModel
          open={openEditSupplyModel}
          onOpenChange={setOpenEditSupplyModel}
          checkoutId={activeCheckoutId}
          zIndex={10000}
          reFetchHistry={refetchHistory}
        />
      )}

      {openEditPaymentModel && (
        <EditPaymentModel
          open={openEditPaymentModel}
          onOpenChange={setOpenEditPaymentModel}
          data={ActiveHistory!}
          zIndex={10000}
          reFetchHistry={refetchHistory}
        />
      )}
    </>
  )
}

// PRODUCT BOUGHT===========================
type productBoxProps = {
  productId: string
  quantity: number
  color: string
  size: string
  design: string
  subproducts: {
    name: string
    sellQuantity: string
  }[]
  model: string
}

const ProductBox = ({
  productId,
  quantity,
  color,
  size,
  design,
  subproducts,
  model
}: productBoxProps) => {
  const { data: Productdata, mutateAsync, isPending } = useReturnSingleProduct()

  useEffect(() => {
    mutateAsync({ productId })
  }, [])

  const colorInfo = Productdata?.colors.find((i) => i.id === color)
  const sizeInfo = Productdata?.sizes.find((i) => i.id === size)
  const designInfo = Productdata?.designs.find((i) => i.id === design)

  return (
    <div className="box">
      {isPending ? (
        <ScaleLoaderUI minHeight={300} />
      ) : (
        <>
          <p>
            Product category: <span>{Productdata?.category.name}</span>
          </p>

          {model && (
            <p>
              Product model: <span>{model}</span>
            </p>
          )}

          <p>
            Quantity bought: <span>{quantity}</span>
          </p>

          {sizeInfo && (
            <p>
              Product model: <span>{sizeInfo.name}</span>
            </p>
          )}

          {colorInfo && (
            <p>
              Product model: <span>{colorInfo.name}</span>
            </p>
          )}

          {designInfo && (
            <p>
              Product model: <span>{designInfo.name}</span>
            </p>
          )}

          {subproducts.length > 0 && (
            <div className="subproducts">
              <h3>Subproducts</h3>

              <div className="subproduct_list">
                {subproducts.map((i, key) => (
                  <p key={key}>
                    {i.sellQuantity} {i.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
