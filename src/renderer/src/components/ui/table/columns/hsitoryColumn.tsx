import { HistoryResponse } from '@renderer/apis/history/getHistory'
import { convertAmount, formatDate } from '@renderer/lib/utils'
import { ColumnDef } from '@tanstack/react-table'

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
    accessorKey: 'checkoutInfo.sellingPrice',
    header: 'Price sold',
    cell: ({ row }) => {
      const data = row.original
      return <p>{convertAmount(data.checkoutInfo.sellingPrice)}</p>
    }
  },
  {
    accessorKey: 'checkoutInfo.paymentStatus',
    header: 'Payment type',
    cell: ({ row }) => {
      const data = row.original
      return (
        <p className={'status ' + 'status__' + data.checkoutInfo.paymentStatus.toLowerCase()}>
          {data.checkoutInfo.paymentStatus}
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
          {Number(checkoutInfo.amountPaid) === 0 ? '--' : convertAmount(checkoutInfo.amountPaid)}
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
    accessorKey: 'checkoutInfo.supplyStatus',
    header: 'Supply status',
    cell: ({ row }) => {
      const data = row.original
      return (
        <p className={'status ' + 'status__' + data.checkoutInfo.supplyStatus.toLowerCase()}>
          {data.checkoutInfo.supplyStatus}
        </p>
      )
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
    accessorKey: 'checkoutInfo.modeifedAt',
    header: 'Modified at',
    cell: ({ row }) => {
      const data = row.original
      return <p>{data.checkoutInfo.modified ? formatDate(data.checkoutInfo.modeifedAt) : null}</p>
    }
  }
]
