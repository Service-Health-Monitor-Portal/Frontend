import { render, screen } from '@testing-library/react'
import Navbar from '../../src/components/Navbar'

describe('Navbar Component', () => {
  beforeEach(() => {
    render(<Navbar />)
  })

  it('should render the correct text', () => {
    const text = screen.getByText('Service tracker')
    expect(text).toBeInTheDocument()
  })
})
