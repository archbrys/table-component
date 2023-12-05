import React from 'react'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { TABLE_HEADER } from '../mock'
import Row from '../components/Row'

const headerKeys = TABLE_HEADER.map((header) => header.id)
const MOCK_DATA = { id: '3', name: 'Mock' }
const onRowClick = jest.fn()
const containerId = 'container-test-id'

describe('Row', () => {
  test('onRowClick', async () => {
    render(
      <div data-testid={containerId}>
        <Row
          rowData={MOCK_DATA}
          headerKeys={headerKeys}
          onRowClick={onRowClick}
        />
      </div>
    )
    const containerEl = screen.getByTestId(containerId)
    const tableRow = containerEl.getElementsByTagName('tr')[0]

    await userEvent.click(tableRow)
    expect(onRowClick).toHaveBeenCalled()
  })

  it('should not call onRowClick', async () => {
    render(
      <div data-testid={containerId}>
        <Row
          rowData={MOCK_DATA}
          headerKeys={headerKeys}
          onRowClick={undefined}
        />
      </div>
    )
    const containerEl = screen.getByTestId(containerId)
    const tableRow = containerEl.getElementsByTagName('tr')[0]

    await userEvent.click(tableRow)
    expect(onRowClick).not.toHaveBeenCalled()
  })

  it('should render function children', async () => {
    const childrenFn = jest.fn()
    render(
      <div data-testid={containerId}>
        <Row
          rowData={MOCK_DATA}
          headerKeys={headerKeys}
          onRowClick={onRowClick}
        >
          {{ name: childrenFn }}
        </Row>
      </div>
    )

    expect(childrenFn).toHaveBeenCalled()
  })

  it('should render children', async () => {
    render(
      <div data-testid={containerId}>
        <Row
          rowData={MOCK_DATA}
          headerKeys={headerKeys}
          onRowClick={onRowClick}
        >
          {{ age: '22' }}
        </Row>
      </div>
    )

    expect(screen.getByText('22')).toBeInTheDocument()
  })
})
