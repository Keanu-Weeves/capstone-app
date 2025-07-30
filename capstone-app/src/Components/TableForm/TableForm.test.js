import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableForm from './TableForm';
import ConfirmationModal from './ConfirmationModal';

window.alert = jest.fn();

jest.mock('./ConfirmationModal', () => ({ formData, onConfirm, onCancel }) => (
    <div data-testid='mock-confirmation-modal'>
        Mock Confirmation Modal
        <button onClick={onConfirm} data-testid="confirm-btn">Confirm</button>
        <button onClick={onCancel} data-testid="cancel-btn">Cancel</button>
    </div>
));

//Test 1 for initial render
describe('TableForm Component', () => {

    test('renders the reservation form with required fields', () => {
        render(<TableForm />);
        expect(screen.getByText('Your Reservation Details')).toBeInTheDocument();
        expect(screen.getByLabelText('Date')).toBeInTheDocument();
        expect(screen.getByLabelText('Time')).toBeInTheDocument();
        expect(screen.getByLabelText('Number of Guests')).toBeInTheDocument();
        expect(screen.getByLabelText('Occasion')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone')).toBeInTheDocument();
        expect(screen.getByLabelText('Comments (optional)')).toBeInTheDocument();
        expect(screen.getByLabelText('Subscribe to Little Lemon News')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /review & reserve/i })).toBeInTheDocument();
    })
    });

    // Test 2 for input change

    test('updates form data when input values change', () => {
        render(<TableForm />);
        //First Name
        const firstNameInput = screen.getByLabelText('First Name');
        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        expect(firstNameInput).toHaveValue('John');
        //Last Name
        const lastNameInput = screen.getByLabelText('Last Name');
        fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
        expect(lastNameInput).toHaveValue('Smith');
        //Email
        const emailInput = screen.getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        expect(emailInput).toHaveValue('john.doe@example.com');
        //Phone
        const phoneInput = screen.getByLabelText('Phone');
        fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
        expect(phoneInput).toHaveValue('123-456-7890');
        //Date
        const dateInput = screen.getByLabelText('Date');
        fireEvent.change(dateInput, { target: { value: '2025-09-19' } });
        expect(dateInput).toHaveValue('2025-09-19');
        //Time
        const timeInput = screen.getByLabelText('Time');
        fireEvent.change(timeInput, { target: { value: '17:00' } });
        expect(timeInput).toHaveValue('17:00');
    });

    //Test 3 Form Submission - confirmation modal

    test('shows confirmation modal on submit', () => {
        render(<TableForm />);

        fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2025-08-01' } });
        fireEvent.change(screen.getByLabelText('Time'), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Test' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });

        const submitButton = screen.getByRole('button', { name: /review & reserve/i });
        fireEvent.click(submitButton);

        expect(screen.getByTestId('mock-confirmation-modal')).toBeInTheDocument();
    });

    //Test 4 Modal Confirmation

    test('confirms reservation and closes modal when "Confirm is clicked', () => {
        render(<TableForm />);

        fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2025-08-01' } });
        fireEvent.change(screen.getByLabelText('Time'), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Test' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByRole('button', { name: /review & reserve/i }));

        expect(screen.getByTestId('mock-confirmation-modal')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('confirm-btn'));
        expect(screen.queryByTestId('mock-confirmation-modal')).not.toBeInTheDocument();

        expect(window.alert).toHaveBeenCalledWith('Reservation successfully confirmed! Thank you. ');
    })

    // Test 5: Modal Cancellation - Does clicking cancel hide the modal?
    test('cancels reservation and closes modal when "Cancel" is clicked', () => {
        render(<TableForm />);

        fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2025-08-01' } });
        fireEvent.change(screen.getByLabelText('Time'), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Test' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByRole('button', { name: /review & reserve/i }));

        expect(screen.getByTestId('mock-confirmation-modal')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('cancel-btn'));

        expect(screen.queryByTestId('mock-confirmation-modal')).not.toBeInTheDocument();
  });

  // Test 6: Date Input Validation (min attribute)
  test('date input min attribute is set to today\'s date', () => {
    render(<TableForm />);
    const dateInput = screen.getByLabelText('Date');

    const getFormattedDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const today = getFormattedDate(new Date());

    expect(dateInput).toHaveAttribute('min', today);
    });

    // Test 7: Time Input Validation (min/max attributes)
    test('time input has correct min and max attributes', () => {
        render(<TableForm />);
        const timeInput = screen.getByLabelText('Time');

        expect(timeInput).toHaveAttribute('min', '16:00');
        expect(timeInput).toHaveAttribute('max', '22:00');
});
