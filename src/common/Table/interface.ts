export interface ITable extends IHeader {
  dataTestId: string
  data: ITableData[] | ITableData[][]
  loading: boolean
  children?: any
  onRowClick?: (data: ITableData) => void
  showPagination?: boolean
  page?: number
  count?: number
  onPageChange?: (page: number) => void
  rowsPerPage?: number
}

export interface ITableHeader {
  id: string
  name: string
  isSortable?: boolean | undefined
  tableSpacing?: number
  key?: string
}

export interface ITableData {
  id: string
  [key: string]: any
}

export interface IBody {
  data: ITableData[] | ITableData[][]
  headerKeys: string[]
  children?: any
  onRowClick?: (data: ITableData) => void
  loading?: boolean
}

export interface IRow {
  rowData: ITableData
  headerKeys: string[]
  children?: any
  onRowClick?: (data: ITableData) => void
}

export interface IHeader {
  headers: ITableHeader[]
  sortBy?: string
  sortDirection?: string
  onSort?: (headerId: string, key: string | undefined) => void
}

export interface IPaginationProps {
  page: number
  onPageChange?: (page: number) => void
  count: number
  rowsPerPage: number
}
