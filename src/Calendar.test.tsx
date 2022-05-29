import React from "react";
import { render, screen } from "@testing-library/react";
import { Calendar } from "./Calendar";

test("renders learn react link", () => {
  render(<Calendar />);
  const linkElement = screen.getByText(/hello/i);
  expect(linkElement).toBeInTheDocument();
});
