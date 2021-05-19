import { render, screen } from "@testing-library/react";
import 'jest-canvas-mock';
import App from "./App";

test("shows header", () => {
  render(<App />);
  const header = screen.getByTestId('app-container');
  expect(header).toBeInTheDocument();
});

test("defaults to home", () => {
  render(<App />);
  const header = screen.getByTestId('home-container');
  expect(header).toBeInTheDocument();
});
