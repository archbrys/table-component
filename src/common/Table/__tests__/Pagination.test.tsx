import React from 'react'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Pagination from '../components/Pagination'

const page = 1
const rowsPerPage = 10
const count = 30
const onPageChange = jest.fn()

describe('Pagination', () => {
  it('should render pagination', () => {
    render(
      <Pagination
        page={page}
        rowsPerPage={rowsPerPage}
        count={count}
        onPageChange={onPageChange}
      />
    )

    expect(screen.getByTestId('pagination')).toBeInTheDocument()
  })

  it('should disabled previous if page in first page', async () => {
    render(
      <Pagination
        page={1}
        rowsPerPage={rowsPerPage}
        count={count}
        onPageChange={onPageChange}
      />
    )

    const prevButton = screen.getByRole('button', {
      name: /Previous/i,
    })
    await userEvent.click(prevButton)

    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('should call onPageChange when previous is click', async () => {
    render(
      <Pagination
        page={2}
        rowsPerPage={rowsPerPage}
        count={count}
        onPageChange={onPageChange}
      />
    )

    const prevButton = screen.getByRole('button', {
      name: /Previous/i,
    })
    await userEvent.click(prevButton)

    expect(onPageChange).toHaveBeenCalled()
  })

  it('should click next', async () => {
    render(
      <Pagination
        page={1}
        rowsPerPage={rowsPerPage}
        count={count}
        onPageChange={onPageChange}
      />
    )

    const nextButton = screen.getByRole('button', {
      name: /Next/i,
    })
    await userEvent.click(nextButton)

    expect(onPageChange).toHaveBeenCalled()
  })

  it('should disabled next if last page', async () => {
    render(
      <Pagination
        page={3}
        rowsPerPage={rowsPerPage}
        count={count}
        onPageChange={onPageChange}
      />
    )

    const nextButton = screen.getByRole('button', {
      name: /Next/i,
    })
    await userEvent.click(nextButton)

    expect(onPageChange).not.toHaveBeenCalled()
  })
})
