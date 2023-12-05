import React from 'react'
import { render, screen } from '@testing-library/react'
import { DATA, TABLE_HEADER } from '../mock'
import Table from '../components/Table'

const dataTestId = 'table-id'
describe('Body', () => {
  it('should render body', () => {
    render(<Table dataTestId={dataTestId} headers={TABLE_HEADER} data={DATA} />)

    expect(screen.getByTestId(dataTestId)).toBeInTheDocument()
  })

  it('should show pagination', () => {
    render(
      <Table
        dataTestId={dataTestId}
        headers={TABLE_HEADER}
        data={DATA}
        showPagination
      />
    )

    expect(screen.getByTestId('pagination')).toBeInTheDocument()
  })

  it('should show no data message', () => {
    render(<Table dataTestId={dataTestId} headers={TABLE_HEADER} data={[]} />)

    expect(screen.getByTestId('no-data')).toBeInTheDocument()
  })

  it('should render loading', () => {
    render(
      <Table dataTestId={dataTestId} headers={TABLE_HEADER} data={[]} loading />
    )

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })
})
