import { getAllDatesOnPage, firstDate, lastDate, nextPage, Page, pageForDate, previousPage } from './lib'

test("firstDate works for jan 2022", () => {
	const first = firstDate({ year: 2022, month: "jan" });
	expect(first.toDateString()).toBe("Sat Jan 01 2022");
});

test('firstDate works for feb 2022', () => {
	const first = firstDate({ year: 2022, month: 'feb' })
	expect(first.toDateString()).toBe("Tue Feb 01 2022")
})

test("lastDate works for jan", () => {
	const end = lastDate({ year: 2022, month: "jan" });
	expect(end.toDateString()).toBe("Mon Jan 31 2022");
});

test("lastDate works for feb", () => {
	const end = lastDate({ year: 2022, month: "feb" });
	expect(end.toDateString()).toBe("Mon Feb 28 2022");
});

test("lastDate works for mar", () => {
	const end = lastDate({ year: 2022, month: "mar" });
	expect(end.toDateString()).toBe("Thu Mar 31 2022");
});


test('getAllDatesOnPage displays correct dates for Jan 2022', () => {
	const page: Page = { month: 'jan', year: 2022 }

	const { underflow, month, overflow } = getAllDatesOnPage(page, 'monday')

	expect(underflow.length + month.length + overflow.length).toBe(7 * 6)
	expect(underflow.length).toBe(5)
	expect(month.length).toBe(31)
	expect(overflow.length).toBe(6)
})

test('getAllDatesOnPage displays correct dates for Dec 2021', () => {
	const page: Page = { month: 'dec', year: 2021 }

	const { underflow, month, overflow } = getAllDatesOnPage(page, 'monday')

	expect(underflow.length + month.length + overflow.length).toBe(7 * 6)
	expect(underflow.length).toBe(2)
	expect(month.length).toBe(31)
	expect(overflow.length).toBe(9)
})

test('getAllDatesOnPage displays correct dates for Dec 2021 (starting on sunday)', () => {
	const page: Page = { month: 'dec', year: 2021 }

	const { underflow, month, overflow } = getAllDatesOnPage(page, 'sunday')

	expect(underflow.length + month.length + overflow.length).toBe(7 * 6)
	expect(underflow.length).toBe(3)
	expect(month.length).toBe(31)
	expect(overflow.length).toBe(8)
})

test('nextPage works for Jan 2020', () => {
	expect(nextPage({ month: 'jan', year: 2020 })).toEqual({ month: 'feb' as const, year: 2020 })
})

test('nextPage works for Dec 2020', () => {
	expect(nextPage({ month: 'dec', year: 2020 })).toEqual({ month: 'jan' as const, year: 2021 })
})

test('previousPage works for Jan 2020', () => {
	expect(previousPage({ month: 'jan', year: 2020 })).toEqual({ month: 'dec' as const, year: 2019 })
})

test('previousPage works for Dec 2020', () => {
	expect(previousPage({ month: 'dec', year: 2020 })).toEqual({ month: 'nov' as const, year: 2020 })
})

test('pageForDate works for Dec 2020', () => {
	expect(pageForDate(new Date(2020, 11, 31))).toEqual({ month: 'dec', year: 2020 })
})
