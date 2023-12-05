import React, { Fragment } from 'react'
import { IBody, ITableData } from '../interface'
import Row from './Row'

function Body({ data, headerKeys, children, onRowClick }: IBody) {
  const iterateRow = (rowData: ITableData | ITableData[]): JSX.Element => (
    <Row
      rowData={rowData as ITableData}
      headerKeys={headerKeys}
      onRowClick={onRowClick}
    >
      {children}
    </Row>
  )

  return (
    <tbody data-testid="table-body">
      {data.map((rowData: ITableData | ITableData[]) => (
        <>{iterateRow(rowData)}</>
      ))}
    </tbody>
  )
}

export default Body
