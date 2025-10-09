import { render, screen } from '@testing-library/react';
import LogList from '../LogList';

describe('LogList Component', () => {
  test('renders "No logs added yet" when logs array is empty', () => {
    render(<LogList logs={[]} />);
    expect(screen.getByText('No logs added yet.')).toBeInTheDocument();
  });

  test('renders logs heading', () => {
    render(<LogList logs={[]} />);
    expect(screen.getByText('Your Logs')).toBeInTheDocument();
  });

  test('renders string logs (legacy format)', () => {
    const logs = ['First log', 'Second log'];
    render(<LogList logs={logs} />);
    
    expect(screen.getByText('First log')).toBeInTheDocument();
    expect(screen.getByText('Second log')).toBeInTheDocument();
  });

  test('renders object logs with text and timestamp', () => {
    const logs = [
      {
        id: 1,
        text: 'Object log entry',
        timestamp: '2023-10-01T12:00:00.000Z'
      }
    ];
    render(<LogList logs={logs} />);
    
    expect(screen.getByText('Object log entry')).toBeInTheDocument();
    // Check for timestamp in a more flexible way
    expect(screen.getByText(/2023/)).toBeInTheDocument();
  });

  test('renders mixed format logs', () => {
    const logs = [
      'String log',
      {
        id: 2,
        text: 'Object log',
        timestamp: '2023-10-01T12:00:00.000Z'
      }
    ];
    render(<LogList logs={logs} />);
    
    expect(screen.getByText('String log')).toBeInTheDocument();
    expect(screen.getByText('Object log')).toBeInTheDocument();
  });

  test('handles logs without timestamp gracefully', () => {
    const logs = [
      {
        id: 3,
        text: 'Log without timestamp'
      }
    ];
    render(<LogList logs={logs} />);
    
    expect(screen.getByText('Log without timestamp')).toBeInTheDocument();
  });

  test('renders multiple logs correctly', () => {
    const logs = [
      { id: 1, text: 'First', timestamp: '2023-10-01T12:00:00.000Z' },
      { id: 2, text: 'Second', timestamp: '2023-10-01T13:00:00.000Z' },
      { id: 3, text: 'Third', timestamp: '2023-10-01T14:00:00.000Z' }
    ];
    render(<LogList logs={logs} />);
    
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
});