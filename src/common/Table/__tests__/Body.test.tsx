import React from 'react'
import { render, screen } from '@testing-library/react'
import Body from '../components/Body'
import { DATA, TABLE_HEADER } from '../mock'

const headerKeys = TABLE_HEADER.map((header) => header.id)
describe('Body', () => {
  it('should render body', () => {
    render(<Body data={DATA} headerKeys={headerKeys} />)

    expect(screen.getByTestId('table-body')).toBeInTheDocument()
  })
})
