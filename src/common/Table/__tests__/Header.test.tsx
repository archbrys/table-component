import React from 'react'
import { render, screen } from '@testing-library/react'

// import { renderWithProviders } from '../../../test-utils'
import { userEvent } from '@testing-library/user-event'
import Header from '../components/Header'
import { TABLE_HEADER } from '../mock'

// headers, sortBy, sortDirection, onSort
describe('Header', () => {
  const onSort = jest.fn()
  const sortBy = TABLE_HEADER[0].id
  const sortDirection = 'asc'
  beforeEach(() => {
    render(
      <table>
        <Header
          headers={TABLE_HEADER}
          onSort={onSort}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />
        <tbody>
          <td>Test</td>
        </tbody>
      </table>
    )
  })

  it('should render headers', async () => {
    const headerElement = screen.getByTestId('table-header')
    expect(headerElement).toBeInTheDocument()
    expect(headerElement.getElementsByTagName('th').length).toEqual(
      TABLE_HEADER.length
    )
  })

  it('should handle sort if enabled', async () => {
    const headerElement = screen.getByTestId('table-header')
    const element = headerElement.getElementsByTagName('th')[0]

    await userEvent.click(element)
    expect(onSort).toHaveBeenCalled()
  })

  it('should not call onSort if disabled', async () => {
    const headerElement = screen.getByTestId('table-header')
    const element = headerElement.getElementsByTagName('th')[1]

    await userEvent.click(element)
    expect(onSort).not.toHaveBeenCalled()
  })

  it('should show sort indicator when sorted', async () => {
    const headerElement = screen.getByTestId('table-header')
    const element = headerElement.getElementsByTagName('th')[0]
    const span = element.getElementsByTagName('span')[1]

    await userEvent.click(element)
    expect(span).toBeInTheDocument()
    expect(span).not.toBeEmptyDOMElement()
  })
})
