import {
  monthToNumber,
  getStartDate,
  getEndDate,
  nextMonth,
  getDatesInRange,
} from "./helpers";

test("monthToNumber works for jan", () => {
  expect(monthToNumber("jan")).toBe(0);
});

test("monthToNumber works for feb", () => {
  expect(monthToNumber("feb")).toBe(1);
});

test("monthToNumber works for dec", () => {
  expect(monthToNumber("dec")).toBe(11);
});

test("getStartDate works for jan 2022", () => {
  const startDate = getStartDate(2022, "jan");
  expect(startDate.getDate()).toBe(1);
});

test("nextMonth for dec returns jan", () => {
  expect(nextMonth("dec")).toBe("jan");
});

test("nextMonth for jan returns feb", () => {
  expect(nextMonth("jan")).toBe("feb");
});

test("getStartDate works for feb 2022", () => {
  const startDate = getStartDate(2022, "feb");
  expect(startDate.getDate()).toBe(1);

  expect(startDate.getMonth()).toBe(1);
});

test("getEndDate works for jan", () => {
  const endDate = getEndDate(2022, "jan");
  expect(endDate.getDate()).toBe(31);
});

test("getEndDate works for feb", () => {
  const endDate = getEndDate(2022, "feb");
  expect(endDate.getDate()).toBe(28);
});

test("getEndDate works for mar", () => {
  const endDate = getEndDate(2022, "mar");
  expect(endDate.getDate()).toBe(31);
});

test("getDatesInRange for the 15st march and 18th of march", () => {
  const startDate = new Date(2022, 3, 15);
  const endDate = new Date(2022, 3, 18);

  const datesInRange = getDatesInRange(startDate, endDate);

  expect(datesInRange.length).toBe(4);
  expect(datesInRange).toContainEqual(startDate);
  expect(datesInRange).toContainEqual(endDate);
});
