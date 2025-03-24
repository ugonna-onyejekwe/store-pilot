import { HistoryResponse, useReturnAllHistory } from '@renderer/apis/history/getHistory'
import { Input } from '@renderer/components/ui/inputs'
import { DataTable } from '@renderer/components/ui/table'
import { History_column } from '@renderer/components/ui/table/columns/hsitoryColumn'
import { useEffect, useState } from 'react'
import './styles.scss'

const History = () => {
  const { isPending, data: history, mutate } = useReturnAllHistory()
  const [searchValue, setSearchValue] = useState('')
  const [date, setDate] = useState('')
  const [filteredHistory, setFilteredHistory] = useState<HistoryResponse[]>([])
  const [rowData, setRowData] = useState<HistoryResponse>()

  console.log(rowData)

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
        }}
      />
      {/* 
      <RowDetails
        open={openDetails}
        onOpenChange={setOpenDetails}
        data={rowData!}
        refetchHistory={mutate}
      /> */}
    </div>
  )
}

export default History
