import React from 'react'
import Header from './Header'
import { ITable } from '../interface'
import { Message } from '../styles'
import Body from './Body'
import Pagination from './Pagination'

function Table({
  dataTestId,
  data,
  headers,
  sortBy,
  sortDirection,
  loading,
  onSort,
  onRowClick,
  children,
  showPagination,
  page,
  count,
  rowsPerPage,
  onPageChange,
}: ITable) {
  const headerKeys = headers.map((header) => header.id)

  return (
    <div data-testid={dataTestId} className="flex flex-col">
      <div className="overflow-x-auto scroll-smooth relative shadow-md sm:rounded-lg h-[600px]">
        <table className="w-full scroll-smooth text-sm text-left text-gray-500">
          <Header
            headers={headers}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <Body
            data={data}
            headerKeys={headerKeys}
            onRowClick={onRowClick}
            loading={loading}
          >
            {children}
          </Body>
        </table>

        {loading ? (
          <Message data-testid="loading">Loading</Message>
        ) : Array.isArray(data) && data.length === 0 ? (
          <Message data-testid="no-data">No data found</Message>
        ) : null}
      </div>
      {showPagination ? (
        <Pagination
          count={count}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
        />
      ) : null}
    </div>
  )
}

Table.defaultProps = {
  children: null,
  sortBy: undefined,
  sortDirection: undefined,
  loading: null,
  data: [],
  headers: [],
  subKey: null,
}

export default Table
