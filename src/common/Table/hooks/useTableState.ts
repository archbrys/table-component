import { useCallback, useState } from 'react'
import { ITableData } from '../interface'

const useTableState = () => {
  const [sortBy, setSortBy] = useState('')
  const [sortDirection, setSortDirection] = useState('')
  const [page, setPage] = useState(1)

  const getComparatorCondition = (a: ITableData, b: ITableData) => {
    const x = sortDirection === 'desc' ? b[sortBy] : a[sortBy]
    const y = sortDirection === 'desc' ? a[sortBy] : b[sortBy]
    if (x < y) {
      return -1
    }
    if (x > y) {
      return 1
    }

    return 0
  }

  const sort = useCallback(
    (data: ITableData[]) => {
      if (sortBy === undefined && sortDirection === undefined) return data
      return data.sort(getComparatorCondition)
    },
    [sortBy, sortDirection]
  )

  return {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    page,
    setPage,
    sort,
  }
}

export default useTableState
