import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
}));

test('renders Little Lemon heading in App', () => {
  render(<App />);
  const linkElement = screen.getByText(/Little Lemon/i);
  expect(linkElement).toBeInTheDocument();
});
