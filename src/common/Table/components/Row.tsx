import React, { useCallback } from 'react'
import { IRow, ITableData } from '../interface'

function Row({ rowData, headerKeys, children, onRowClick }: IRow) {
  // Add the missing key value
  const sanitizeRowData = useCallback(
    (data: ITableData): ITableData => {
      const newData = { ...data }
      headerKeys.forEach((key) => {
        if (!rowData[key]) {
          newData[key] = null
        }
      })
      return newData
    },
    [rowData]
  )

  const getCells = useCallback(
    (data: ITableData) => {
      const arrCells = Object.entries(sanitizeRowData(data))

      const newCells: any = []
      headerKeys.forEach((header) =>
        arrCells.forEach(([index, value]) => {
          if (header === index) {
            newCells.push([index, value])
          }
        })
      )

      return newCells
    },
    [rowData]
  )

  const getValue = useCallback(
    (key: string, value: ITableData) =>
      children && key in children && children[key]
        ? typeof children[key] === 'function'
          ? children[key](rowData) || ''
          : children[key] || ''
        : value,
    []
  )

  const handleOnClick = useCallback((rData: ITableData): void => {
    if (onRowClick) onRowClick(rData)
  }, [])

  return (
    <tr className="bg-white border-b" onClick={() => handleOnClick(rowData)}>
      {getCells(rowData).map(
        ([key, value]: [string, ITableData]): JSX.Element => (
          <td className="py-4 px-6" key={`${key}-td`}>
            {getValue(key, value)}
          </td>
        )
      )}
    </tr>
  )
}

Row.defaultProps = {
  children: null,
}

export default Row
