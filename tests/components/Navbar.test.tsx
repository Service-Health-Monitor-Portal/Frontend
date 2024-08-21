import { fireEvent, render, screen } from '@testing-library/react'
import Navbar from '../../src/components/Navbar'
import { HashRouter } from 'react-router-dom'

describe('Navbar Component', () => {
  beforeEach(() => {
    render(
      <HashRouter>
        <Navbar />
      </HashRouter>
      )
  })

  it('should have logo', () => {
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
    fireEvent.click(logo);
    expect(window.location.hash).toBe('#/');
  })
})
