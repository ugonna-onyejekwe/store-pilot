import { useState } from 'react'
import { Icons } from '../icons'

export const TablePagination = ({ table }: { table: any }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <div className="pagination">
      <div className="page_count">
        <span>
          Page{' '}
          <strong>
            {currentPage} of {table.getPageCount()}
          </strong>{' '}
        </span>
      </div>

      <div className="action_col">
        <select
          value={table.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
            setCurrentPage(1)
            table.setPageIndex(0)
          }}
        >
          {[1, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>

        <div className="btns">
          <button
            onClick={() => {
              table.setPageIndex(0)
              setCurrentPage(1)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <Icons.AllPrevBtn className="icon" />
          </button>
          <button
            onClick={() => {
              table.previousPage()
              prevPage()
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <Icons.PrevBtn className="icon" />
          </button>
          <button
            onClick={() => {
              table.nextPage()
              nextPage()
            }}
            disabled={!table.getCanNextPage()}
          >
            <Icons.NextBtn className="icon" />
          </button>
          <button
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1)

              setCurrentPage(table.getPageCount())
            }}
            disabled={!table.getCanNextPage()}
          >
            <Icons.AllNextBtn className="icon" />
          </button>{' '}
        </div>
      </div>
    </div>
  )
}
