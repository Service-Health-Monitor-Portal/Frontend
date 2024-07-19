import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Home from '../../src/pages/Home'

describe('Home Component', () => {
  let history: ReturnType<typeof createMemoryHistory>

  beforeEach(() => {
    history = createMemoryHistory()
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>
    )
  })

  it('should render the heading', () => {
    const heading = screen.getByText('Welcome to service tracker')
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
    expect(history.location.pathname).toBe('/dashboard')
  })

  it('should render the image', () => {
    const image = screen.getByAltText('home')
    expect(image).toBeInTheDocument()
  })
})
