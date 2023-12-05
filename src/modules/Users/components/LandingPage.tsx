import React, { useCallback, useEffect, useMemo } from 'react'
import Table from '../../../common/Table/components/Table'
import useTableState from '../../../common/Table/hooks/useTableState'
import { TABLE_HEADER, UserProperties } from '../constants'
import { ITableData } from '../../../common/Table/interface'
import { fetchUsers } from '../actions'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectAllUser } from '../reducer'

function LandingPage() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUser)
  const {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    page,
    setPage,
    sort,
  } = useTableState()

  const handleSort = (headerId: string) => {
    let newDirection =
      sortDirection === '' || sortDirection === 'desc' ? 'asc' : 'desc'
    if (headerId !== sortBy) newDirection = 'asc'
    setSortDirection(newDirection)
    setSortBy(headerId)
  }

  const handleRowClick = () => null

  const sanitizeData = useMemo(
    (): ITableData[] =>
      users
        .map((user) => {
          const sanitizeUser: ITableData = {
            ...(user as unknown as ITableData),
          }

          return sanitizeUser
        })
        .slice((page - 1) * 10, page * 10),
    [users, page]
  )

  const handleFetchUsers = useCallback((): void => {
    dispatch(fetchUsers())
  }, [])

  const sanitizeTableData = useCallback((data: ITableData, key: string) => {
    switch (key) {
      case UserProperties.Name: {
        return `${data.firstName} ${data.lastName}`
      }

      case UserProperties.Gender: {
        return data.gender
          ? `${data.gender[0].toUpperCase()}${data.gender.slice(1)}`
          : '-'
      }

      default:
        return data[key]
    }
  }, [])

  useEffect(() => {
    handleFetchUsers()
  }, [])

  return (
    <div
      data-testid="users-page"
      className="flex items-center justify-center min-h-[450px]"
    >
      <Table
        dataTestId="users-table"
        data={sort(sanitizeData)}
        headers={TABLE_HEADER}
        onSort={handleSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onRowClick={handleRowClick}
        loading={false}
        showPagination
        page={page}
        count={users.length}
        rowsPerPage={10}
        onPageChange={setPage}
      >
        {{
          [UserProperties.Name]: (data: ITableData) =>
            sanitizeTableData(data, UserProperties.Name),
          [UserProperties.Gender]: (data: ITableData) =>
            sanitizeTableData(data, UserProperties.Gender),
          [UserProperties.Phone]: (data: ITableData) =>
            sanitizeTableData(data, UserProperties.Phone),
        }}
      </Table>
    </div>
  )
}

export default LandingPage
