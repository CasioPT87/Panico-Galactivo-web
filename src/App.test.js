import { render, screen } from "@testing-library/react";
import 'jest-canvas-mock';
import App from "./App";

test("shows header", () => {
  render(<App />);
  const header = screen.getByTestId('app-container');
  expect(header).toBeInTheDocument();
});

test("shows navigation", () => {
  render(<App />);
  const navigation = screen.getByRole('navigation');
  expect(navigation).toBeInTheDocument();
});

test("defaults to home", () => {
  render(<App />);
  const home = screen.getByTestId('home-container');
  expect(home).toBeInTheDocument();
});

test("shows heading panico galactico", () => {
  render(<App />);
  const heading = screen.getByRole('heading');
  expect(heading.textContent).toMatch('>');
});
