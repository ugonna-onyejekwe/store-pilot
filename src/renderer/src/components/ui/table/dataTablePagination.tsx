'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from 'react-icons/md'

type TablePaginationProps = {
  table: any
  data: any
  searchParams?: {
    page?: string
    limit?: string
  }
}

export const TablePagination = ({
  table,
  data,
  searchParams: searchParamsObject
}: TablePaginationProps) => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  if (!data) return

  const { hasNextPage, hasPreviousPage, limit: pageSize, page: currentPage, totalPages } = data
  const { replace } = useRouter()
  const pathname = usePathname()

  // Handler for updating the search parameters in the URL
  const updateParams = (page: string, limit: string) => {
    params.set('page', page)
    params.set('limit', limit)
    replace(`${pathname}?${params.toString()}`)
  }

  // Handler for going to the next page
  const goToNextPage = () => {
    if (hasNextPage) {
      const nextPageIndex = currentPage + 1
      updateParams(String(nextPageIndex), String(pageSize))
    }
  }

  // Handler for going to the previous page
  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      const prevPageIndex = currentPage - 1
      updateParams(String(prevPageIndex), String(pageSize))
    }
  }

  // Handler for setting the page size
  const handlePageSizeChange = (value: string) => {
    const newSize = Number(value)
    updateParams('1', String(newSize))
    table.setPageSize(value)
  }

  return (
    <div className="pagination_container">
      <div className="col1">
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>

      <div className="col2">
        <div className="page_size_con">
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(e.target.value)}
            defaultValue={pageSize}
          >
            {[1, 10, 20, 30, 40, 50].map((i, key) => (
              <option key={key} value={`${i}`}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div className="nav_btns">
          <div className="btns_con">
            <button
              className="double_next"
              onClick={() => updateParams('1', pageSize)}
              disabled={!hasPreviousPage}
            >
              <MdKeyboardDoubleArrowLeft />
            </button>
            <button onClick={goToPreviousPage} disabled={!hasPreviousPage}>
              <MdKeyboardArrowLeft />
            </button>
          </div>

          <span>{currentPage}</span>

          <div className="btns_con">
            <button onClick={goToNextPage} disabled={!hasNextPage}>
              <MdKeyboardArrowRight />
            </button>
            <button
              className="double_next"
              onClick={() => updateParams(String(totalPages), pageSize)}
              disabled={data.islast || !hasNextPage}
            >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
