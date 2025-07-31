// src/Components/TableForm/TableForm.test.js

import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// 1. Declare your mock functions FIRST and at the TOP
const mockFetchAPI = jest.fn();
const mockSubmitAPI = jest.fn();

// 2. MOCK THE MODULES using the declared functions.
// This MUST happen before any component that imports these modules is imported.
jest.mock('../../Utils/api.js', () => ({ // Ensure this path is correct: ../../Utils/api.js
  fetchAPI: mockFetchAPI,
  submitAPI: mockSubmitAPI,
}));

// Mock window.alert once at the top
window.alert = jest.fn();

// Mock ConfirmationModal once at the top
jest.mock('./ConfirmationModal', () => ({ formData, onConfirm, onCancel }) => (
  <div data-testid="mock-confirmation-modal">
    Mock Confirmation Modal
    <button onClick={onConfirm} data-testid="confirm-btn">Confirm</button>
    <button onClick={onCancel} data-testid="cancel-btn">Cancel</button>
  </div>
));

// 3. THEN, import the component you are testing
import TableForm from './TableForm.js';

// --- ALL your test suites should come AFTER the initial setup/mocks ---

// This describes your general UI tests (Test 1, Test 2, Test 3, Test 4, Test 5, Test 6, Test 7 from your original file)
describe('TableForm Component - UI and Basic Interaction', () => {

  // Before each test, reset mocks to default behavior
  beforeEach(() => {
    mockFetchAPI.mockClear();
    mockSubmitAPI.mockClear();
    window.alert.mockClear(); // Clear alert mock too

    // Ensure default mock values for API calls are set for all tests
    // This provides a baseline, which can be overridden in specific tests if needed.
    mockFetchAPI.mockReturnValue([
      "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
    ]);
    mockSubmitAPI.mockResolvedValue(true);
  });

  // Test 1: Initial Render - Does it render correctly with required fields?
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
  });

  // Test 2: Input Change - Does typing into an input update its value?
  test('updates form data when input values change', async () => { // Changed to async
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
    //Time (Needs await as it relies on state updated by useEffect)
    const timeInput = await screen.findByLabelText('Time'); // Use findByLabelText
    fireEvent.change(timeInput, { target: { value: '17:00' } });
    expect(timeInput).toHaveValue('17:00');
  });

  // Test 6: Date Input Validation (min attribute) - (Moved here for logical grouping)
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

  // Test 7: Time Input Validation (min/max attributes) - Removed this test
  // This test expects min/max on the <select> element, which are not standard HTML attributes for select.
  // The times are dynamic based on fetchAPI, so a static min/max check on the element itself is not accurate.
  // The actual validation logic should be within your component's state management or form validation.
  // If you need to test the *options* rendered, you'd do that in the API integration tests.

});


// This describes your API integration tests (Test 1-9 from the previous full API test suite)
// Note: Some test numbers might be reused if you reordered or removed others.
describe('TableForm Component - API Integration', () => {

  // The beforeEach from the top-level scope will run, providing default mocks.
  // You can override specific mocks here if needed for certain tests.

  // Test 1: Initial Render - Does it render correctly and call fetchAPI for today?
  test('renders the reservation form and fetches initial times for today', async () => {
    render(<TableForm />);

    expect(screen.getByText('Your Reservation Details')).toBeInTheDocument();
    expect(mockFetchAPI).toHaveBeenCalledTimes(1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expect(mockFetchAPI).toHaveBeenCalledWith(expect.any(Date)); // Jest will compare the date parts here

    const timeSelect = await screen.findByLabelText('Time');
    expect(timeSelect).toHaveValue('17:00');
    expect(screen.getByRole('option', { name: '17:00' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '18:00' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: '15:00' })).not.toBeInTheDocument();
  });

  // Test 2: Input Change - Does typing into an input update its value? (API aware version)
  test('updates form data when input values change (API aware)', async () => {
    render(<TableForm />);
    const firstNameInput = screen.getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput).toHaveValue('John');

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    expect(emailInput).toHaveValue('john.doe@example.com');

    const dateInput = screen.getByLabelText('Date');
    fireEvent.change(dateInput, { target: { value: '2025-08-01' } });
    expect(dateInput).toHaveValue('2025-08-01');

    const timeSelect = await screen.findByLabelText('Time');
    fireEvent.change(timeSelect, { target: { value: '19:00' } });
    expect(timeSelect).toHaveValue('19:00');
  });

  // Test 3: Date Change - Does changing the date update available times?
  test('updates available times when the reservation date changes', async () => {
    render(<TableForm />);

    // Override mockFetchAPI for this specific test
    mockFetchAPI.mockImplementation((date) => {
      if (date.toISOString().split('T')[0] === '2025-08-02') {
        return ["16:00", "17:00", "18:00"];
      }
      return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    });

    const dateInput = screen.getByLabelText('Date');
    fireEvent.change(dateInput, { target: { value: '2025-08-02' } });

    const timeSelect = await screen.findByLabelText('Time');

    // It was called once initially, then again after date change
    expect(mockFetchAPI).toHaveBeenCalledTimes(2);
    const expectedDate = new Date('2025-08-02');
    expectedDate.setHours(0, 0, 0, 0);
    expect(mockFetchAPI).toHaveBeenCalledWith(expectedDate);

    expect(timeSelect).toHaveValue('16:00');
    expect(screen.getByRole('option', { name: '16:00' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '17:00' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '18:00' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: '19:00' })).not.toBeInTheDocument();
  });

  // Test 4: Form Submission - Does submitting the form call submitAPI and show the modal on success?
  test('calls submitAPI and shows confirmation modal on successful form submission', async () => {
    render(<TableForm />);

    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2025-08-01' } });
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });

    const submitButton = screen.getByRole('button', { name: /review & reserve/i });
    await act(async () => { // Wrap fireEvent.click in act for async state updates
      fireEvent.click(submitButton);
    });


    expect(mockSubmitAPI).toHaveBeenCalledTimes(1);
    expect(mockSubmitAPI).toHaveBeenCalledWith(expect.objectContaining({
      resDate: '2025-08-01',
      resTime: '18:00',
      firstName: 'Test',
      email: 'test@example.com',
    }));

    await waitFor(() => {
      expect(screen.getByTestId('mock-confirmation-modal')).toBeInTheDocument();
    });
  });

  // Test 5: Form Submission - Does submitting the form show an alert on failure?
  test('shows alert on failed form submission', async () => {
    mockSubmitAPI.mockResolvedValue(false); // Override for this test

    render(<TableForm />);

    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2025-08-01' } });
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });

    const submitButton = screen.getByRole('button', { name: /review & reserve/i });
    await act(async () => { // Wrap fireEvent.click in act
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith('Reservation failed. Please try again or contact us directly.');
    });

    expect(screen.queryByTestId('mock-confirmation-modal')).not.toBeInTheDocument();
  });

  // Test 6: Modal Confirmation - Does clicking confirm hide the modal and reset form?
  test('confirms reservation, closes modal, and resets form', async () => {
    render(<TableForm />);

    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2025-08-01' } });
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    await act(async () => { // Wrap fireEvent.click in act
      fireEvent.click(screen.getByRole('button', { name: /review & reserve/i }));
    });

    await waitFor(() => {
      expect(screen.getByTestId('mock-confirmation-modal')).toBeInTheDocument();
    });

    await act(async () => { // Wrap fireEvent.click in act
      fireEvent.click(screen.getByTestId('confirm-btn'));
    });


    await waitFor(() => {
      expect(screen.queryByTestId('mock-confirmation-modal')).not.toBeInTheDocument();
    });

    expect(screen.getByLabelText('First Name')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    const todayFormatted = new Date();
    todayFormatted.setHours(0, 0, 0, 0);
    expect(screen.getByLabelText('Date')).toHaveValue(todayFormatted.toISOString().split('T')[0]);
    expect(screen.getByLabelText('Time')).toHaveValue('17:00');
  });

  // Test 7: Modal Cancellation - Does clicking cancel hide the modal?
  test('cancels reservation and closes modal when "Cancel" is clicked', async () => {
    render(<TableForm />);

    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2025-08-01' } });
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    await act(async () => { // Wrap fireEvent.click in act
      fireEvent.click(screen.getByRole('button', { name: /review & reserve/i }));
    });

    await waitFor(() => {
      expect(screen.getByTestId('mock-confirmation-modal')).toBeInTheDocument();
    });

    await act(async () => { // Wrap fireEvent.click in act
      fireEvent.click(screen.getByTestId('cancel-btn'));
    });

    await waitFor(() => {
      expect(screen.queryByTestId('mock-confirmation-modal')).not.toBeInTheDocument();
    });
  });

  // Test 9: Time dropdown initial selection
  test('time dropdown initially selects the first available time', async () => {
    mockFetchAPI.mockReturnValue(["17:00", "18:00", "19:00"]); // Ensure this mock is set for this specific test
    render(<TableForm />);

    const timeSelect = await screen.findByLabelText('Time');
    expect(timeSelect).toHaveValue('17:00');
  });
});