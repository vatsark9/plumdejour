import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header Component', () => {
  test('renders the main title', () => {
    render(<Header />);
    expect(screen.getByText('plumdejour')).toBeInTheDocument();
  });

  test('renders the subtitle', () => {
    render(<Header />);
    expect(screen.getByText('Your Daily Log Tracker')).toBeInTheDocument();
  });

  test('has correct heading structure', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('plumdejour');
  });
});