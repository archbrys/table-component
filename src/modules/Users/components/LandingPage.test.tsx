import React from 'react'
import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import LandingPage from './LandingPage'
import { renderWithProviders } from '../../../test-utils'
import { ITableData } from '../../../common/Table/interface'

const DUMMY_USERS: ITableData[] = [
  { id: '1', firstName: 'John', lastName: 'John', phone: '1', gender: null },
  { id: '2', firstName: 'John', lastName: 'John', phone: '2', gender: 'male' },
  { id: '3', firstName: 'John', lastName: 'John', phone: '3' },
  { id: '4', firstName: 'John', lastName: 'John', phone: '4' },
  { id: '5', firstName: 'John', lastName: 'John', phone: '5' },
  { id: '6', firstName: 'John', lastName: 'John', phone: '6' },
  { id: '7', firstName: 'John', lastName: 'John', phone: '7' },
  { id: '8', firstName: 'John', lastName: 'John', phone: '8' },
  { id: '9', firstName: 'John', lastName: 'John', phone: '9' },
  { id: '10', firstName: 'John', lastName: 'John', phone: '10' },
  {
    id: '11',
    firstName: 'John',
    lastName: 'John',
    phone: '10',
    gender: 'male',
  },
  { id: '12', firstName: null, lastName: null, phone: null, gender: null },
]

describe('Users Table Page', () => {
  beforeEach(() => {
    renderWithProviders(<LandingPage />, {
      preloadedState: {
        user: {
          users: DUMMY_USERS,
          status: 'idle',
        },
      },
    })
  })

  it('should render the page', async () => {
    const headerElement = screen.getByTestId('table-header')
    const element = headerElement.getElementsByTagName('th')[0]
    await userEvent.click(element)
    await userEvent.click(element)
    expect(screen.getByTestId('users-page')).toBeInTheDocument()
  })

  it('should render - if gender is null ', async () => {
    const bodyEl = screen.getByTestId('table-body')
    const tableRow = bodyEl.getElementsByTagName('tr')[0]
    const cell = tableRow.getElementsByTagName('td')[3]
    expect(cell.textContent).toContain('-')
  })
})
