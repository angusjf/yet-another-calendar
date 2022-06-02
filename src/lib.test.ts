import  { getAllDatesOnPage, getFirstDate, nextPage, Page, pageForDate, previousPage } from './lib'

// test("monthToNumber works for jan", () => {
//   expect(monthToNumber("jan")).toBe(0);
// });

// test("monthToNumber works for feb", () => {
//   expect(monthToNumber("feb")).toBe(1);
// });

// test("monthToNumber works for dec", () => {
//   expect(monthToNumber("dec")).toBe(11);
// });

// test("monthFromNumber works for jan", () => {
//   expect(monthFromNumber(0)).toBe("jan");
// });

// test("monthFromNumber works for dec", () => {
//   expect(monthFromNumber(11)).toBe("dec");
// });

// test("getStartDate works for jan 2022", () => {
//   const startDate = getStartDate(2022, "jan");
//   expect(startDate.getDate()).toBe(1);
// });

// test("nextMonth for dec returns jan", () => {
//   expect(nextMonth("dec")).toBe("jan");
// });

// test("nextMonth for jan returns feb", () => {
//   expect(nextMonth("jan")).toBe("feb");
// });

test('getStartDate works for feb 2022', () => {
	const startDate = getFirstDate({year: 2022, month: 'feb'})
	expect(startDate.getDate()).toBe(1)

	expect(startDate.getMonth()).toBe(1)
})

// test("getEndDate works for jan", () => {
//   const endDate = getEndDate(2022, "jan");
//   expect(endDate.getDate()).toBe(31);
// });

// test("getEndDate works for feb", () => {
//   const endDate = getEndDate(2022, "feb");
//   expect(endDate.getDate()).toBe(28);
// });

// test("getEndDate works for mar", () => {
//   const endDate = getEndDate(2022, "mar");
//   expect(endDate.getDate()).toBe(31);
// });

// test("getDatesInRange for the 15st march and 18th of march", () => {
//   const startDate = new Date(2022, 3, 15);
//   const endDate = new Date(2022, 3, 18);

//   const datesInRange = getDatesInRange(startDate, endDate);

//   expect(datesInRange.length).toBe(4);
//   expect(datesInRange).toContainEqual(startDate);
//   expect(datesInRange).toContainEqual(endDate);
// });

test('getAllDatesOnPage displays correct dates for Jan 2022', () => {
	const page: Page = { month: 'jan', year: 2022}

	const {underflow, month, overflow} = getAllDatesOnPage(page, 'monday')

	expect(underflow.length + month.length + overflow.length).toBe(7 * 6)
	expect(underflow.length).toBe(5)
	expect(month.length).toBe(31)
	expect(overflow.length).toBe(6)
})

test('getAllDatesOnPage displays correct dates for Dec 2021', () => {
	const page: Page = { month: 'dec', year: 2021}

	const {underflow, month, overflow} = getAllDatesOnPage(page, 'monday')

	expect(underflow.length + month.length + overflow.length).toBe(7 * 6)
	expect(underflow.length).toBe(2)
	expect(month.length).toBe(31)
	expect(overflow.length).toBe(9)
})

test('getAllDatesOnPage displays correct dates for Dec 2021 (starting on sunday)', () => {
	const page: Page = { month: 'dec', year: 2021}

	const {underflow, month, overflow} = getAllDatesOnPage(page, 'sunday')

	expect(underflow.length + month.length + overflow.length).toBe(7 * 6)
	expect(underflow.length).toBe(3)
	expect(month.length).toBe(31)
	expect(overflow.length).toBe(8)
})

test('nextPage works for Jan 2020', () => {
	expect(nextPage({month: 'jan', year: 2020})).toEqual({month: 'feb' as const, year: 2020})
})

test('nextPage works for Dec 2020', () => {
	expect(nextPage({month: 'dec', year: 2020})).toEqual({month: 'jan' as const, year: 2021})
})

test('previousPage works for Jan 2020', () => {
	expect(previousPage({month: 'jan', year: 2020})).toEqual({month: 'dec' as const, year: 2019})
})

test('previousPage works for Dec 2020', () => {
	expect(previousPage({month: 'dec', year: 2020})).toEqual({month: 'nov' as const, year: 2020})
})

test('pageForDate works for Dec 2020', () => {
	expect(pageForDate(new Date(2020, 11, 31))).toEqual({month: 'dec', year: 2020})
})
