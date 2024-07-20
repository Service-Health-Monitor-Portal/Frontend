import { Mock } from 'vitest'
import useCustomQuery from '../../src/hooks/useCustomQuery'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import ServicesList from '../../src/components/Dashboard/ServicesList'

// Mock useCustomQuery hook
vi.mock('../../src/hooks/useCustomQuery', () => ({
  __esModule: true,
  default: vi.fn(),
}))

describe('ServicesList', () => {
  const mockSetOpen = vi.fn()

  beforeEach(() => {
    vi.resetAllMocks()
    ;(useCustomQuery as unknown as Mock).mockReturnValue({
      data: [
        { id: 1, name: 'Service 1', description: 'Description 1' },
        { id: 2, name: 'Service 2', description: 'Description 2' },
      ],
      isLoading: false,
    })
  })

  const renderServicesList = () => {
    render(
      <BrowserRouter>
        <ServicesList setOpen={mockSetOpen} />
      </BrowserRouter>
    )
  }

  it('should display loading message when data is loading', () => {
    ;(useCustomQuery as unknown as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    })
    renderServicesList()
    expect(screen.getByRole('loader')).toBeInTheDocument()
  })

  it('should display services when data is loaded', () => {
    renderServicesList()
    expect(screen.getByText('Service 1')).toBeInTheDocument()
    expect(screen.getByText('Service 2')).toBeInTheDocument()
  })

  it('should call setOpen(false) when a service is clicked', () => {
    renderServicesList()
    const serviceLink = screen.getByText('Service 1')
    fireEvent.click(serviceLink)
    expect(mockSetOpen).toHaveBeenCalledWith(false)
  })
})
