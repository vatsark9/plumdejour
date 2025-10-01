import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogInput from '../LogInput';

describe('LogInput Component', () => {
  const defaultProps = {
    maxChars: 200,
    input: '',
    setInput: jest.fn(),
    addLog: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input field with placeholder', () => {
    render(<LogInput {...defaultProps} />);
    expect(screen.getByPlaceholderText('Enter your log here...')).toBeInTheDocument();
  });

  test('displays character count correctly', () => {
    render(<LogInput {...defaultProps} />);
    expect(screen.getByText('200 characters remaining')).toBeInTheDocument();
  });

  test('updates character count when input changes', () => {
    const props = { ...defaultProps, input: 'Hello' };
    render(<LogInput {...props} />);
    expect(screen.getByText('195 characters remaining')).toBeInTheDocument();
  });

  test('shows red text when at character limit', () => {
    const props = { ...defaultProps, input: 'a'.repeat(200) };
    render(<LogInput {...props} />);
    const charCount = screen.getByText('0 characters remaining');
    expect(charCount).toHaveClass('text-red-500');
  });

  test('calls setInput when typing', async () => {
    const user = userEvent.setup();
    render(<LogInput {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Enter your log here...');
    await user.type(input, 'A');
    
    // Check that setInput was called with the typed character
    expect(defaultProps.setInput).toHaveBeenCalledWith('A');
  });

  test('prevents input beyond maxChars limit', async () => {
    const user = userEvent.setup();
    const props = { ...defaultProps, input: 'a'.repeat(199) };
    render(<LogInput {...props} />);
    
    const input = screen.getByPlaceholderText('Enter your log here...');
    await user.type(input, 'bb');
    
    // Should only allow one more character
    expect(defaultProps.setInput).toHaveBeenCalledWith('a'.repeat(199) + 'b');
  });

  test('calls addLog when Add Log button is clicked', async () => {
    const user = userEvent.setup();
    render(<LogInput {...defaultProps} />);
    
    const button = screen.getByText('Add Log');
    await user.click(button);
    
    expect(defaultProps.addLog).toHaveBeenCalledTimes(1);
  });

  test('displays current input value', () => {
    const props = { ...defaultProps, input: 'Current input' };
    render(<LogInput {...props} />);
    
    const input = screen.getByDisplayValue('Current input');
    expect(input).toBeInTheDocument();
  });
});