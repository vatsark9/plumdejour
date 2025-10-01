import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders footer text', () => {
    render(<Footer />);
    expect(screen.getByText('Made with 💜 for Hacktoberfest')).toBeInTheDocument();
  });

  test('has correct semantic structure', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});