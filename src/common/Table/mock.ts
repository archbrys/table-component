import { ITableData } from './interface'

export const TABLE_HEADER = [
  { id: 'name', name: 'Name', isSortable: true },
  { id: 'age', name: 'Age' },
]

export const DATA: ITableData[] = [
  { id: '1', name: 'John', age: '20' },
  { id: '2', name: 'Doe', age: '21' },
]
