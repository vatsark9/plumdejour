import { render, screen } from '@testing-library/react';
import Summary from '../Summary';

describe('Summary Component', () => {
  test('renders nothing when summary is empty', () => {
    const { container } = render(<Summary summary="" />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when summary is null', () => {
    const { container } = render(<Summary summary={null} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when summary is undefined', () => {
    const { container } = render(<Summary summary={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders summary heading when summary exists', () => {
    render(<Summary summary="Test summary" />);
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });

  test('renders summary text when summary exists', () => {
    const summaryText = 'This is a test summary of the logs.';
    render(<Summary summary={summaryText} />);
    expect(screen.getByText(summaryText)).toBeInTheDocument();
  });

  test('renders long summary text correctly', () => {
    const longSummary = 'This is a very long summary that contains multiple sentences. It should render properly even when it spans multiple lines and contains various punctuation marks.';
    render(<Summary summary={longSummary} />);
    expect(screen.getByText(longSummary)).toBeInTheDocument();
  });
});