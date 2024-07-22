import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AddServiceForm from '../../src/components/AddService/AddServiceForm';


const renderComponent = () => {
  return render(
    <BrowserRouter>
      <AddServiceForm />
    </BrowserRouter>
  );
};

describe('AddServiceForm', () => {
  test('renders form elements', () => {
    renderComponent();
    expect(screen.getByLabelText(/Service Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Success Rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dependency Error Rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Invalid Input Error Rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Throttling Error Rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fault Error Rate/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Service/i })).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    renderComponent();
    const nameInput = screen.getByLabelText(/Service Name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Test Service' } });
    expect(nameInput.value).toBe('Test Service');
  });
});
