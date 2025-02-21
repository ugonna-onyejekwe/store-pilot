import { useReturnAllHistory } from '@renderer/apis/history/getHistory'
import { Input } from '@renderer/components/inputs'
import { DataTable } from '@renderer/components/ui/table'
import { History_column } from '@renderer/components/ui/table/columns/hsitoryColumn'
import { useEffect } from 'react'
import './styles.scss'

const History = () => {
  const { isPending, data: history, mutate } = useReturnAllHistory()

  useEffect(() => mutate(), [])

  return (
    <div className="container history_page">
      <div className="filter_con">
        <div className="search_con">
          <Input placeholder="Search" onChange={() => {}} value={''} />
        </div>

        <div className="date_con">
          <input type="date" />
        </div>
      </div>

      <DataTable columns={History_column} isLoading={isPending} data={history ?? []} isClickable />
    </div>
  )
}

export default History
