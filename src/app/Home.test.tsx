import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/i)).toBeDefined();
  });

  it('displays the Next.js logo', () => {
    render(<Home />);
    expect(screen.getByAltText('Next.js Logo')).toBeDefined();
  });

  it('contains link to documentation', () => {
    render(<Home />);
    expect(screen.getByText('Docs')).toBeDefined();
    expect(
      screen.getByText(
        /Find in-depth information about Next.js features and API./i
      )
    ).toBeDefined();
  });

  // Add more tests as needed
});
