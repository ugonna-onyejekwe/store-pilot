import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'
import { Icons } from '../icons'
import { ScaleLoaderUI } from '../loader'
import './styles.scss'

export const DataTable = ({
  columns,
  data,
  searchValue,
  handleClick,
  isClickable,
  isLoading,
  pagination
}: TableProps) => {
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    columns,
    data,
    state: {
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter
  })

  // useEffect(() => {
  //   if (searchValue) {
  //     table.setGlobalFilter(String(searchValue))
  //   } else {
  //     table.setGlobalFilter('')
  //   }
  // }, [searchValue, table])

  return (
    <div className="table_wrapper ">
      <div className="table_con">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup?.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr className="loader">
                <td colSpan={columns.length}>
                  <ScaleLoaderUI minHeight={500} />
                </td>
              </tr>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => {
                    isClickable && handleClick && handleClick(row.original)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="data_not_found">
                <td colSpan={columns.length}>
                  <span>
                    <Icons.EmptyIcon className="empty_icon" />
                  </span>
                  <br />
                  <p>No result found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* {table.getRowModel().rows?.length > 0 && <TablePagination table={table} data={pagination} />} */}
    </div>
  )
}
