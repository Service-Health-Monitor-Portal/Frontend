import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import useCustomQuery from '../../src/hooks/useCustomQuery';
import Sidebar from '../../src/components/Dashboard/Sidebar';

// Mock useCustomQuery hook
vi.mock('../../src/hooks/useCustomQuery', () => ({
  __esModule: true,
  default: vi.fn(),
}));

// Partially mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const renderSidebar = (open: boolean, setOpen: (open: boolean) => void) => {
  render(
    <BrowserRouter>
      <Sidebar open={open} setOpen={setOpen} />
    </BrowserRouter>
  );
};

describe('Sidebar', () => {
  const mockSetOpen = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useCustomQuery as unknown as Mock).mockReturnValue({
      data: [
        { id: 1, name: 'Service 1', description: 'Description 1' },
        { id: 2, name: 'Service 2', description: 'Description 2' },
      ],
      isLoading: false,
    });
    (vi.mocked(useNavigate) as Mock).mockReturnValue(mockNavigate);
  });

  it('should display Add Service button', () => {
    renderSidebar(true, mockSetOpen);
    expect(screen.getByText('Add Service')).toBeInTheDocument();
  });

  it('should display services when loaded', () => {
    renderSidebar(true, mockSetOpen);
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
  });

  it('should call navigate when Add Service button is clicked', () => {
    renderSidebar(true, mockSetOpen);
    const addButton = screen.getByText('Add Service');
    fireEvent.click(addButton);
    expect(mockNavigate).toHaveBeenCalledWith('/add-service');
  });

  it('should call setOpen(false) when a service is clicked', () => {
    renderSidebar(true, mockSetOpen);
    const serviceLink = screen.getByText('Service 1');
    fireEvent.click(serviceLink);
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
