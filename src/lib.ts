export interface Page {
	month: Month;
	year: number;
}

export type CalendarStartDay = 'monday' | 'sunday'

export type Month =
	| 'jan'
	| 'feb'
	| 'mar'
	| 'apr'
	| 'may'
	| 'jun'
	| 'jul'
	| 'aug'
	| 'sep'
	| 'oct'
	| 'nov'
	| 'dec';


export const firstDate = ({ year, month }: Page): Date => {
	const monthToNumber = (month: Month): number => {
		if (month === 'jan') { return 0 }
		if (month === 'feb') { return 1 }
		if (month === 'mar') { return 2 }
		if (month === 'apr') { return 3 }
		if (month === 'may') { return 4 }
		if (month === 'jun') { return 5 }
		if (month === 'jul') { return 6 }
		if (month === 'aug') { return 7 }
		if (month === 'sep') { return 8 }
		if (month === 'oct') { return 9 }
		if (month === 'nov') { return 10 }
		return 11
	}
	return new Date(year, monthToNumber(month), 1)
}

export const lastDate = ({ year, month }: Page): Date => {
	const endDate = firstDate(nextPage({ year, month }))

	endDate.setDate(endDate.getDate() - 1)

	return endDate
}

export const getAllDatesOnPage = (page: Page, calendarStartDay: CalendarStartDay): {
	underflow: Date[],
	month: Date[], overflow: Date[]
} => {
	const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
		const datesInRange = []

		for (const d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
			datesInRange.push(new Date(d))
		}

		return datesInRange
	}

	const getUnderflow = (startDate: Date, calendarStartDay: CalendarStartDay) => {
		const underflow = []
		const d = new Date(startDate)

		const dayNumberToStopAt = calendarStartDay === 'sunday' ? 0 : 1

		while (d.getDay() !== dayNumberToStopAt) {
			d.setDate(d.getDate() - 1)
			underflow.push(new Date(d))
		}

		return underflow.reverse()
	}

	const getOverflow = (endDate: Date, numberOfDays: number) => {
		const underflow = []
		const d = new Date(endDate)

		for (let n = 0; n < numberOfDays; n += 1) {
			d.setDate(d.getDate() + 1)
			underflow.push(new Date(d))
		}

		return underflow
	}

	const startDate = firstDate(page)

	const endDate = lastDate(page)

	const underflow = getUnderflow(startDate, calendarStartDay)

	const month = getDatesInRange(startDate, endDate)

	const overflow = getOverflow(endDate, 6 * 7 - underflow.length - month.length)

	return { underflow, month, overflow }
}

export const nextPage = ({ month, year }: Page): Page => {
	if (month === 'jan') return { month: 'feb', year }
	if (month === 'feb') return { month: 'mar', year }
	if (month === 'mar') return { month: 'apr', year }
	if (month === 'apr') return { month: 'may', year }
	if (month === 'may') return { month: 'jun', year }
	if (month === 'jun') return { month: 'jul', year }
	if (month === 'jul') return { month: 'aug', year }
	if (month === 'aug') return { month: 'sep', year }
	if (month === 'sep') return { month: 'oct', year }
	if (month === 'oct') return { month: 'nov', year }
	if (month === 'nov') return { month: 'dec', year }
	return { month: 'jan', year: year + 1 }
}

export const previousPage = ({ month, year }: Page): Page => {
	if (month === 'jan') return { month: 'dec', year: year - 1 }
	if (month === 'feb') return { month: 'jan', year }
	if (month === 'mar') return { month: 'feb', year }
	if (month === 'apr') return { month: 'mar', year }
	if (month === 'may') return { month: 'apr', year }
	if (month === 'jun') return { month: 'may', year }
	if (month === 'jul') return { month: 'jun', year }
	if (month === 'aug') return { month: 'jul', year }
	if (month === 'sep') return { month: 'aug', year }
	if (month === 'oct') return { month: 'sep', year }
	if (month === 'nov') return { month: 'oct', year }
	return { month: 'nov', year }
}

export const pageForDate = (date: Date): Page => {
	const year = date.getFullYear()

	switch (date.getMonth()) {
		case 0: return { year, month: 'jan' }
		case 1: return { year, month: 'feb' }
		case 2: return { year, month: 'mar' }
		case 3: return { year, month: 'apr' }
		case 4: return { year, month: 'may' }
		case 5: return { year, month: 'jun' }
		case 6: return { year, month: 'jul' }
		case 7: return { year, month: 'aug' }
		case 8: return { year, month: 'sep' }
		case 9: return { year, month: 'oct' }
		case 10: return { year, month: 'nov' }
		case 11:
		default: return { year, month: 'dec' }
	}
}

