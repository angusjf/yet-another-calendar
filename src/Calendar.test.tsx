import React from "react";
import { render, screen } from "@testing-library/react";
import { Calendar } from "./Calendar";

test("renders month and year (may 2022)", () => {
  const page = { year: 2022, month: "may" as const };
  render(<Calendar page={page} />);

  const year = screen.getByText(/2022/i);
  expect(year).toBeInTheDocument();

  const month = screen.getByText(/may/i);
  expect(month).toBeInTheDocument();
});

test("renders month and year (april 2023)", () => {
  const page = { year: 2023, month: "apr" as const };
  render(<Calendar page={page} />);

  const year = screen.getByText(/2023/i);
  expect(year).toBeInTheDocument();

  const month = screen.getByText(/apr/i);
  expect(month).toBeInTheDocument();
});

test("renders elements for all 30 days in april", () => {
  const page = { year: 2023, month: "apr" as const };
  render(<Calendar page={page} />);

  for (let i = 1; i <= 30; i++) {
    const button = screen.getByText(i.toString());
    expect(button).toBeInTheDocument();
  }
});

test("renders elements for all 31 days in may", () => {
  const page = { year: 2023, month: "may" as const };
  render(<Calendar page={page} />);

  for (let i = 1; i <= 31; i++) {
    const button = screen.getByText(i.toString());
    expect(button).toBeInTheDocument();
  }
});
