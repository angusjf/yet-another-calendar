/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { Calendar } from './Calendar'
import { Month, Page } from './lib'

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

test.concurrent.each(testData)('renders all %i days in %s', (n, year, month) => {
	const page: Page = { year, month }

	render(<Calendar page={page} />)

	for (let i = 1; i <= n; i++) {
		const buttons = screen.getAllByText(i.toString())
		expect(buttons.length).toBeGreaterThanOrEqual(1)
	}
  });
