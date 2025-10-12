import { render, screen } from '@testing-library/react';
import LogList from '../LogList';

describe('LogList Component', () => {
  const mockUpdateLog = jest.fn();
  const mockDeleteLog = jest.fn();

  beforeEach(() => {
    mockUpdateLog.mockClear();
    mockDeleteLog.mockClear();
  });

  test('renders "No logs added yet" when logs array is empty', () => {
    render(<LogList logs={[]} updateLog={mockUpdateLog} deleteLog={mockDeleteLog} />);
    expect(screen.getByText('No logs added yet.')).toBeInTheDocument();
  });

  test('renders logs heading', () => {
    render(<LogList logs={[]} updateLog={mockUpdateLog} deleteLog={mockDeleteLog} />);
    expect(screen.getByText('Your Logs')).toBeInTheDocument();
  });

  test('renders string logs (legacy format)', () => {
    const logs = ['First log', 'Second log'];
    render(<LogList logs={logs} updateLog={mockUpdateLog} deleteLog={mockDeleteLog} />);
    
    expect(screen.getByText('First log')).toBeInTheDocument();
    expect(screen.getByText('Second log')).toBeInTheDocument();
  });

  test('renders object logs with text and timestamp', () => {
    const logs = [
      {
        id: 1,
        text: 'Object log entry',
        date: '10/1/2023',
        timestamp: '2023-10-01T12:00:00.000Z'
      }
    ];
    render(<LogList logs={logs} updateLog={mockUpdateLog} deleteLog={mockDeleteLog} />);
    
    expect(screen.getByText('Object log entry')).toBeInTheDocument();
    expect(screen.getByText('10/1/2023')).toBeInTheDocument();
  });

  test('renders mixed format logs', () => {
    const logs = [
      'String log',
      {
        id: 2,
        text: 'Object log',
        date: '10/1/2023',
        timestamp: '2023-10-01T12:00:00.000Z'
      }
    ];
    render(<LogList logs={logs} updateLog={mockUpdateLog} deleteLog={mockDeleteLog} />);
    
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
    render(<LogList logs={logs} updateLog={mockUpdateLog} deleteLog={mockDeleteLog} />);
    
    expect(screen.getByText('Log without timestamp')).toBeInTheDocument();
  });

  test('renders edit and delete buttons for each log', () => {
    const logs = [
      {
        id: 1,
        text: 'Test log',
        date: '10/1/2023'
      }
    ];
    render(<LogList logs={logs} updateLog={mockUpdateLog} deleteLog={mockDeleteLog} />);
    
    expect(screen.getByTitle('Edit log')).toBeInTheDocument();
    expect(screen.getByTitle('Delete log')).toBeInTheDocument();
  });

  test('renders multiple logs correctly', () => {
    const logs = [
      { id: 1, text: 'First', timestamp: '2023-10-01T12:00:00.000Z' },
      { id: 2, text: 'Second', timestamp: '2023-10-01T13:00:00.000Z' },
      { id: 3, text: 'Third', timestamp: '2023-10-01T14:00:00.000Z' }
    ];
    render(<LogList logs={logs} updateLog={mockUpdateLog} deleteLog={mockDeleteLog} />);
    
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
});