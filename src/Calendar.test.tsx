/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { Calendar } from './Calendar'
import { Month, nextPage, Page } from './lib'

const testData: [number, number, Month][] =
	[
		[31, 2000, 'jan'],
		[28, 2001, 'feb'],
		[29, 2000, 'feb'],
		[31, 2002, 'mar'],
		[30, 2003, 'apr'],
		[31, 2004, 'may'],
		[30, 2005, 'jun'],
		[31, 2006, 'jul'],
		[31, 2007, 'aug'],
		[30, 2008, 'sep'],
		[31, 2009, 'oct'],
		[30, 2010, 'nov'],
		[31, 2011, 'dec'],
	]

test.each(testData)('renders all %i days in %s %s', (n, year, month) => {
	const page: Page = { year, month }

	render(<Calendar page={page} />)

	for (let i = 1; i <= n; i++) {
		const buttons = screen.getAllByText(i.toString())
		expect(buttons.length).toBeGreaterThanOrEqual(1)
	}
});

test('rerenders on prop change', () => {
	const page: Page = { year: 2022, month: "feb" }

	const { rerender } = render(<Calendar page={page} />)

	expect(screen.getAllByText("13").length).toBe(2)

	rerender(<Calendar page={nextPage(page)} />)

	expect(screen.getAllByText("13").length).toBe(1)

	rerender(<Calendar page={page} renderDate={() => <></>} />)

	expect(screen.queryAllByText("13").length).toBe(0)

	rerender(<Calendar page={page} />)

	expect(screen.queryAllByText("30").length).toBe(0)

	rerender(<Calendar page={page} calendarStartDay="sunday" />)

	expect(screen.getAllByText("30").length).toBe(1)
});

test('does not re-render without prop change', () => {
	const page: Page = { year: 2022, month: "feb" }
	const ref = { current: 0 }

	const renderDate = () => <span>{++ref.current}</span>;

	const { rerender } = render(<Calendar page={page} renderDate={renderDate} />)

	expect(screen.getAllByText("1").length).toBe(1)

	rerender(<Calendar page={page} renderDate={renderDate} />)

	expect(screen.queryAllByText("1").length).toBe(1)
})

test('does re-render with meaningful prop change', () => {
	const page: Page = { year: 2022, month: "feb" }
	const ref = { current: 0 }

	const renderDate = () => <span>{++ref.current}</span>;

	const { rerender } = render(<Calendar page={page} renderDate={renderDate} />)

	expect(screen.getAllByText("1").length).toBe(1)

	rerender(<Calendar page={{ year: 2022, month: "jan" }} renderDate={renderDate} />)

	expect(screen.queryAllByText("1").length).toBe(0)
})

test('uses today as date if none provided', () => {
	render(<Calendar renderDate={({ date }) => <span>{date.getMonth()}</span>} />)
	expect(screen.getAllByText(new Date().getMonth().toString()).length).toBeGreaterThan(0)
})