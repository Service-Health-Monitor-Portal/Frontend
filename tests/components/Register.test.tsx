
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../../src/pages/Register";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../src/redux/store";

describe('Register Page', () => {
     beforeEach(() => {
          render(
               <Provider store={store}>
                    <HashRouter>
                         <Register />
                    </HashRouter>
               </Provider>
          )
     })

     it('should have a logo', () => {
          const logo = screen.getByTestId('logo');
          expect(logo).toBeInTheDocument();
     });

     it('should go to home page when clicked on logo', () => {
          const logo = screen.getByTestId('logo');
          fireEvent.click(logo);
          expect(window.location.hash).toBe('#/')
     });

     it('should have a username input', () => {
          const username = screen.getByPlaceholderText('Enter your username');
          expect(username).toBeInTheDocument();
     });



     it('should have an email input', () => {
          const email = screen.getByPlaceholderText('Enter your email');
          expect(email).toBeInTheDocument();
     });

     it('should have a password input', () => {
          const password = screen.getByPlaceholderText('Enter your password');
          expect(password).toBeInTheDocument();
     });

     it('should have a confirm password input', () => {
          const confirmPassword = screen.getByPlaceholderText('Confirm your password');
          expect(confirmPassword).toBeInTheDocument();
     });

     it('should have a register button', () => {
          const register = screen.getByText('Register');
          expect(register).toBeInTheDocument();
     });

     it('should show error message when username is not provided', async () => {
          const register = screen.getByText('Register');
          userEvent.click(register);
          const errorMessage = await screen.findByText('Username is required');
          expect(errorMessage).toBeInTheDocument();
     });

     it('should show error message when email is not provided', async () => {
          const register = screen.getByText('Register');
          userEvent.click(register);
          const errorMessage = await screen.findByText('Email is required');
          expect(errorMessage).toBeInTheDocument();
     });

     it('should show error message when password is not provided', async () => {
          const register = screen.getByText('Register');
          userEvent.click(register);
          const errorMessage = await screen.findByText('Password is required');
          expect(errorMessage).toBeInTheDocument();
     });

     it('should show error message when confirm password is not provided', async () => {
          const register = screen.getByText('Register');
          userEvent.click(register);
          const errorMessage = await screen.findByText('Confirm Password is required');
          expect(errorMessage).toBeInTheDocument();
     });

     it('should show error message when Username less than 3 char', async () => {
          const username = screen.getByPlaceholderText('Enter your username');
          await userEvent.type(username, 'te');
          const email = screen.getByPlaceholderText('Enter your email');
          await userEvent.type(email, '12');
          const errorMessage = await screen.findByText('Username must be at least 3 characters')
          expect(errorMessage).toBeInTheDocument();
     });

     it('should show error message whan Username more than 30 char', async () => {
          const username = screen.getByPlaceholderText('Enter your username');
          await userEvent.type(username, 'te'.repeat(16));
          const email = screen.getByPlaceholderText('Enter your email');
          await userEvent.type(email, '12');
          const errorMessage = await screen.findByText('Username must be at most 30 characters')
          expect(errorMessage).toBeInTheDocument();
     });

     it('should show error message when email is invalid', async () => {
          const email = screen.getByPlaceholderText('Enter your email');
          await userEvent.type(email, 'test');
          const username = screen.getByPlaceholderText('Enter your username');
          await userEvent.type(username, 'test');
          const errorMessage = await screen.findByText('Invalid email');
          expect(errorMessage).toBeInTheDocument();
     });

     it('should show error message when email is invalid', async () => {
          const email = screen.getByPlaceholderText('Enter your email');
          await userEvent.type(email, '@test.com');
          const username = screen.getByPlaceholderText('Enter your username');
          await userEvent.type(username, 'test');
          const errorMessage = await screen.findByText('Invalid email');
          expect(errorMessage).toBeInTheDocument();
     })

     it('should show error message when password less than 8 char', async () => {
          const password = screen.getByPlaceholderText('Enter your password');
          await userEvent.type(password, '1234567');
          const email = screen.getByPlaceholderText('Enter your email');
          await userEvent.type(email, '12');
          const errorMessage = await screen.findByText('Password must be at least 8 characters');
          expect(errorMessage).toBeInTheDocument();
     });

     it('should show error message when password more than 30 char', async () => {
          const password = screen.getByPlaceholderText('Enter your password');
          await userEvent.type(password, '1234567890'.repeat(4));
          const email = screen.getByPlaceholderText('Enter your email');
          await userEvent.type(email, '12');
          const errorMessage = await screen.findByText('Password must be at most 30 characters');
          expect(errorMessage).toBeInTheDocument();
     });

     it('should show error message when confirm password does not match password', async () => {
          const password = screen.getByPlaceholderText('Enter your password');
          await userEvent.type(password, '12345678');
          const confirmPassword = screen.getByPlaceholderText('Confirm your password');
          await userEvent.type(confirmPassword, '123456789');
          const email = screen.getByPlaceholderText('Enter your email');
          await userEvent.type(email, '12');
          const errorMessage = await screen.findByText('Passwords must match');
          expect(errorMessage).toBeInTheDocument();
     });

     it('should hide and show password when be click on show password icon', async () => {
          const password = screen.getByPlaceholderText('Enter your password');
          const showPassword = screen.getByTestId('showPassword');
          expect(password).toHaveAttribute('type', 'password');
          await userEvent.click(showPassword);
          expect(password).toHaveAttribute('type', 'text');
     });

     it('should hide and show confirm password when be click on show password icon', async () => {
          const confirmPassword = screen.getByPlaceholderText('Confirm your password');
          const showConfirmPassword = screen.getByTestId('showConfirmPassword');
          expect(confirmPassword).toHaveAttribute('type', 'password');
          await userEvent.click(showConfirmPassword);
          expect(confirmPassword).toHaveAttribute('type', 'text');
     })

})
