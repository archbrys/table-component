import React from 'react'
import { IHeader, ITableHeader } from '../interface'

function Header({ headers, sortBy, sortDirection, onSort }: IHeader) {
  const handleSort = (
    headerId: string,
    isSortable: boolean | undefined,
    key: string | undefined
  ): void => {
    if (onSort && isSortable) onSort(headerId, key)
  }

  const renderHeaderCell = (key: string, headerCell: ITableHeader) => {
    const cursor = headerCell.isSortable ? 'pointer' : 'default'

    return (
      <th
        scope="col"
        className="px-6 py-3"
        style={{ cursor }}
        onClick={() =>
          handleSort(headerCell.id, headerCell.isSortable, headerCell.key)
        }
        key={key}
      >
        <span>{headerCell.name}</span>
        <span>
          {sortBy === headerCell.id
            ? sortDirection !== 'desc'
              ? '▼'
              : '▲'
            : null}
        </span>
      </th>
    )
  }

  return (
    <thead
      data-testid="table-header"
      className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0"
    >
      <tr>
        {headers.map((headerCell) =>
          renderHeaderCell(headerCell.id, headerCell)
        )}
      </tr>
    </thead>
  )
}

Header.defaultProps = {
  headers: [],
  sortDirection: 'asc',
  sortBy: undefined,
  onSort: undefined,
}

export default Header
