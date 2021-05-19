import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'jest-canvas-mock';
import Navigation from "./Navigation";
import App from '../../App';

test('shows the three buttons', () => {
  render(<Router><Navigation /></Router>);
  const homeLink = screen.getByRole('link', { name: 'Home' });
  const membersLink = screen.getByRole('link', { name: 'Members' });
  const listenLink = screen.getByRole('link', { name: 'Listen' });
  expect(homeLink).toBeInTheDocument();
  expect(membersLink).toBeInTheDocument();
  expect(listenLink).toBeInTheDocument();
})

test('members link goes to members', () => {
  render(<App />);
  const membersLink = screen.getByRole('link', { name: 'Members' });
  fireEvent.click(membersLink);
  const membersContainer = screen.getByTestId('members-container');
  const listenContainer = screen.queryByTestId('listen-container');
  const homeContainer = screen.queryByTestId('home-container');
  expect(membersContainer).toBeInTheDocument(); 
  expect(listenContainer).toBeNull(); 
  expect(homeContainer).toBeNull(); 
})

test('listen link goes to listen', () => {
  render(<App />);
  const listenLink = screen.getByRole('link', { name: 'Listen' });
  fireEvent.click(listenLink);
  const membersContainer = screen.queryByTestId('members-container');
  const listenContainer = screen.queryByTestId('listen-container');
  const homeContainer = screen.queryByTestId('home-container');
  expect(listenContainer).toBeInTheDocument(); 
  expect(membersContainer).toBeNull(); 
  expect(homeContainer).toBeNull(); 
})

test('home link goes to home', () => {
  render(<App />);
  const membersLink = screen.getByRole('link', { name: 'Members' });
  const homeLink = screen.getByRole('link', { name: 'Home' });
  fireEvent.click(membersLink);
  const membersContainer = screen.getByTestId('members-container');
  expect(membersContainer).toBeInTheDocument(); 
  fireEvent.click(homeLink);
  const homeContainer = screen.getByTestId('home-container');
  expect(homeContainer).toBeInTheDocument(); 
})
  