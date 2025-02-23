import { HistoryResponse, useReturnAllHistory } from '@renderer/apis/history/getHistory'
import { useReturnSingleProduct } from '@renderer/apis/products/getSingleProduct'
import { Input } from '@renderer/components/inputs'
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
  useEffect(() => mutate(), [])

  useEffect(() => {
    if (date) {
      const dateString = new Date(date)
      const timestamp = dateString.getTime()

      const list = history?.filter(
        (i) =>
          Number(i.checkoutInfo.createdAt) === timestamp ||
          Number(i.checkoutInfo.modeifedAt) === timestamp
      )

      history?.map((i) =>
        console.log(
          formatDate(i.checkoutInfo.createdAt),
          formatDate(i.checkoutInfo.createdAt) === formatDate(date),
          formatDate(date)
        )
      )

      setFilteredHistory(list ?? [])
    }
  }, [date])

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
        data={filteredHistory.length > 0 ? filteredHistory : (history ?? [])}
        isClickable
        searchValue={searchValue}
        handleClick={(rowData) => {
          setRowData(rowData)
          setOpenDetails(true)
        }}
      />

      <RowDetails open={openDetails} onOpenChange={setOpenDetails} data={rowData!} />
    </div>
  )
}

export default History

type RowDetailsProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  data: HistoryResponse
}

const RowDetails = ({ open, onOpenChange, data }: RowDetailsProps) => {
  if (!data) return null
  console.log(data.listOfProducts)

  return (
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
            Checkout price: <span>{convertAmount(Number(data.checkoutInfo.sellingPrice))}</span>
          </p>

          <p>
            Payment type: <span>{data.checkoutInfo.paymentStatus.toUpperCase()}</span>
          </p>

          <p>
            Amount left to pay:{' '}
            <span>
              {data.checkoutInfo.paymentStatus.toLowerCase() === 'full payment'
                ? convertAmount(0)
                : convertAmount(
                    Number(data.checkoutInfo.sellingPrice) - Number(data.checkoutInfo.amountPaid)
                  )}
            </span>
          </p>

          <p>
            Store where product is sold: <span>{data.checkoutInfo.locationSold}</span>
          </p>

          <p>
            Supply status: <span>{data.checkoutInfo.supplyStatus.toUpperCase()}</span>
          </p>

          <p>
            Supply location: <span>{data.checkoutInfo.supplyLocation || 'Not specified'}</span>
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

        {data.listOfProducts.length > 0 && (
          <div className="goods_section">
            <h3>Goods bought</h3>

            <div className="box_con">
              {data.listOfProducts.map((i, key) => (
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
  )
}

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
