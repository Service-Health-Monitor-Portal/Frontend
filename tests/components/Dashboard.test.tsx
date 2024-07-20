import { fireEvent, render, screen } from '@testing-library/react'
import { Mock, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from '../../src/pages/Dashboard'
import useCustomQuery from '../../src/hooks/useCustomQuery'
import { useWindowWidth } from '@react-hook/window-size'

// Mock hooks
vi.mock('../../src/hooks/useCustomQuery', () => ({
  __esModule: true,
  default: vi.fn(),
}))

vi.mock('@react-hook/window-size', () => ({
  useWindowWidth: vi.fn(),
}))

// Mock ChartBox component
vi.mock('../../src/components/Dashboard/ChartBox', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="mock-chart">Mock Chart</div>),
}))

const queryClient = new QueryClient()

const renderDashboard = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )
}

describe('Dashboard', () => {
  beforeEach(() => {
    ;(useWindowWidth as Mock).mockReturnValue(1024)
  })

  it('should display loader when data is loading', async () => {
    ;(useCustomQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    })

    renderDashboard()

    expect(screen.getByRole('loader')).toBeInTheDocument()
  })

  it('should display a message when no id is provided', () => {
    ;(useCustomQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    })

    renderDashboard()

    expect(screen.getByText('Please choose service to open it')).toBeInTheDocument()
  })

  it('should display data when loaded', async () => {
    ;(useCustomQuery as Mock).mockReturnValue({
      data: [
        {
          status: 'success',
          time: '2021-09-01T00:00:00.000Z',
        },
      ],
      isLoading: false,
    })

    renderDashboard()

    expect(screen.getByText('Service:')).toBeInTheDocument()
    const charts = screen.getAllByTestId('mock-chart')
    expect(charts).toHaveLength(3)
    charts.forEach((chart) => {
      expect(chart).toBeInTheDocument()
    })
  })

  it('should change refetch interval', async () => {
    ;(useCustomQuery as Mock).mockReturnValue({
      data: [
        {
          status: 'success',
          time: '2021-09-01T00:00:00.000Z',
        },
      ],
      isLoading: false,
    })

    renderDashboard()

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    fireEvent.change(select, { target: { value: '60000' } })
    expect(select).toHaveValue('60000')
  })

  it('should display data when loaded on mobile', async () => {
    ;(useWindowWidth as Mock).mockReturnValue(320)
    ;(useCustomQuery as Mock).mockReturnValue({
      data: [
        {
          status: 'success',
          time: '2021-09-01T00:00:00.000Z',
        },
      ],
      isLoading: false,
    })

    renderDashboard()

    expect(screen.getByText('Service:')).toBeInTheDocument()
    const charts = screen.getAllByTestId('mock-chart')
    expect(charts).toHaveLength(3)
    charts.forEach((chart) => {
      expect(chart).toBeInTheDocument()
    })
  })
})
