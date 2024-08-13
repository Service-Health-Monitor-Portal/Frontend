import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../../src/pages/Home'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { Mock } from 'vitest'

// Partially mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

describe('Home Component', () => {
  const mockNavigate = vi.fn()
  beforeEach(() => {
    vi.resetAllMocks();
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate)
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  })

  it('should render the heading', () => {
    const heading = screen.getByTestId('heading')
    expect(heading).toBeInTheDocument()
  })

  it('should render the subheading', () => {
    const subheading = screen.getByText('Monitor your service meticulously to ensure flawless performance')
    expect(subheading).toBeInTheDocument()
  })

  it('should render the button', () => {
    const button = screen.getByText('Join us now')
    expect(button).toBeInTheDocument()
  })

  it('should navigate to dashboard on button click', () => {
    const button = screen.getByText('Join us now')
    fireEvent.click(button)
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('should render the image', () => {
    const image = screen.getByAltText('home')
    expect(image).toBeInTheDocument()
  })
})
