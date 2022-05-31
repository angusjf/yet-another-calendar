import { render, screen } from "@testing-library/react";
import { Calendar } from "./Calendar";
import { Page } from "./helpers";

test("renders month and year (may 2022)", () => {
  const page: Page = { year: 2022, month: "may" };
  render(<Calendar page={page} />);

  const year = screen.getByText(/2022/i);
  expect(year).toBeInTheDocument();

  const month = screen.getByText(/may/i);
  expect(month).toBeInTheDocument();
});

test("renders month and year (april 2023)", () => {
  const page: Page = { year: 2023, month: "apr" };
  render(<Calendar page={page} />);

  const year = screen.getByText(/2023/i);
  expect(year).toBeInTheDocument();

  const month = screen.getByText(/apr/i);
  expect(month).toBeInTheDocument();
});

test("renders elements for all 30 days in april", () => {
  const page: Page = { year: 2023, month: "may" };
  render(<Calendar page={page} />);

  for (let i = 1; i <= 31; i++) {
    const buttons = screen.getAllByText(i.toString());
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  }
});

test("renders elements for all 31 days in may", () => {
  const page: Page = { year: 2023, month: "may" };
  render(<Calendar page={page} />);

  let duplicates = 0;
  let total = 0;

  for (let i = 1; i <= 31; i++) {
    const buttons = screen.getAllByText(i.toString());
    expect(buttons.length).toBeGreaterThanOrEqual(1);
    if (buttons.length === 2) {
        duplicates += 1;
    }
    total += buttons.length;
  }

  expect(duplicates).toBeGreaterThanOrEqual(10);
  expect(total).toBe(7 * 6);
});
