import { render, screen } from '@testing-library/react';
import WeeklySummaryGraph from '../WeeklySummaryGraph';


jest.mock('recharts', () => ({
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>
}));

describe('WeeklySummaryGraph', () => {
  test('renders component with title', () => {
    const mockLogs = [
      {
        id: 1,
        text: 'Test log 1',
        timestamp: new Date().toISOString()
      }
    ];

    render(<WeeklySummaryGraph logs={mockLogs} />);
    
    expect(screen.getByText('Weekly Summary')).toBeInTheDocument();
    expect(screen.getByText(/Total logs this week:/)).toBeInTheDocument();
    expect(screen.getByText(/Showing logs added over the past 7 days/)).toBeInTheDocument();
  });

  test('shows empty state when no logs', () => {
    render(<WeeklySummaryGraph logs={[]} />);
    
    expect(screen.getByText('Weekly Summary')).toBeInTheDocument();
    expect(screen.getByText('No logs to display')).toBeInTheDocument();
  });

  test('displays chart components when logs exist', () => {
    const mockLogs = [
      {
        id: 1,
        text: 'Test log 1',
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        text: 'Test log 2',
        timestamp: new Date().toISOString()
      }
    ];

    render(<WeeklySummaryGraph logs={mockLogs} />);
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByText(/Total logs this week:/)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('handles logs without timestamps', () => {
    const mockLogs = [
      {
        id: 1,
        text: 'Test log without timestamp'
      },
      {
        id: 2,
        text: 'Test log with timestamp',
        timestamp: new Date().toISOString()
      }
    ];

    render(<WeeklySummaryGraph logs={mockLogs} />);
    
    expect(screen.getByText('Weekly Summary')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });
});