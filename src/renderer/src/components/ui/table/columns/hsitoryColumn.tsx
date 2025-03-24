import { HistoryResponse } from '@renderer/apis/history/getHistory'
import { convertAmount, formatDate } from '@renderer/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { Icons } from '../../icons'

export const History_column: ColumnDef<HistoryResponse>[] = [
  {
    accessorKey: 'checkoutInfo.customerName',
    header: 'Customer name',
    cell: ({ row }) => {
      const data = row.original
      return <p>{data.checkoutInfo.customerName}</p>
    }
  },
  {
    accessorKey: 'checkoutInfo.paymentType',
    header: 'Payment type',
    cell: ({ row }) => {
      const data = row.original
      return (
        <p className={'status ' + 'status__' + data.checkoutInfo.paymentType.toLowerCase()}>
          {data.checkoutInfo.paymentType}
        </p>
      )
    }
  },
  {
    accessorKey: 'checkoutInfo.amountToPay',
    header: 'Price sold',
    cell: ({ row }) => {
      const data = row.original
      return (
        <p>
          {data.checkoutInfo.paymentType === 'full'
            ? '__'
            : convertAmount(data.checkoutInfo.amountToPay)}
        </p>
      )
    }
  },

  {
    accessorKey: 'checkoutInfo.amountPaid',
    header: 'Amount paid',
    cell: ({ row }) => {
      const { checkoutInfo } = row.original
      return (
        <p>
          {checkoutInfo.paymentType.toLowerCase() === 'full'
            ? '__'
            : convertAmount(checkoutInfo.amountPaid)}
        </p>
      )
    }
  },

  {
    accessorKey: 'checkoutInfo.locationSold',
    header: 'Location sold',
    cell: ({ row }) => {
      const data = row.original
      return <p>{data.checkoutInfo.locationSold}</p>
    }
  },

  {
    accessorKey: 'checkoutInfo.createdAt',
    header: 'Created at',
    cell: ({ row }) => {
      const data = row.original
      return <p>{formatDate(data.checkoutInfo.createdAt)}</p>
    }
  },

  {
    accessorKey: 'checkoutInfo.checkoutId',
    header: '',
    cell: () => {
      return (
        <div>
          <Icons.DotMenu className="icon" />

          {/* <p>{formatDate(data.checkoutInfo.checkoutId)}</p> */}
        </div>
      )
    }
  }
]
