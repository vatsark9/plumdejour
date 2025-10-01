import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('App Component - Simple Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  test('renders main components', () => {
    render(<App />);
    
    expect(screen.getByText('plumdejour')).toBeInTheDocument();
    expect(screen.getByText('Your Daily Log Tracker')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your log here...')).toBeInTheDocument();
    expect(screen.getByText('Add Log')).toBeInTheDocument();
    expect(screen.getByText('Generate Summary')).toBeInTheDocument();
    expect(screen.getByText('Clear Logs')).toBeInTheDocument();
  });

  test('shows empty state initially', () => {
    render(<App />);
    expect(screen.getByText('No logs added yet.')).toBeInTheDocument();
  });

  test('can add a log entry', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('Enter your log here...');
    await user.type(input, 'Test log entry');
    
    const addButton = screen.getByText('Add Log');
    await user.click(addButton);
    
    expect(screen.getByText('Test log entry')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('character counter works correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    expect(screen.getByText('200 characters remaining')).toBeInTheDocument();
    
    const input = screen.getByPlaceholderText('Enter your log here...');
    await user.type(input, 'Hello');
    
    expect(screen.getByText('195 characters remaining')).toBeInTheDocument();
  });

  test('can generate summary', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Add a log first
    const input = screen.getByPlaceholderText('Enter your log here...');
    await user.type(input, 'My daily log');
    await user.click(screen.getByText('Add Log'));
    
    // Generate summary
    await user.click(screen.getByText('Generate Summary'));
    
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('My daily log.')).toBeInTheDocument();
  });

  test('shows no logs message when generating summary with empty logs', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.click(screen.getByText('Generate Summary'));
    
    expect(screen.getByText('No logs for today.')).toBeInTheDocument();
  });
});