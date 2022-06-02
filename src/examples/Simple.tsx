import { useState } from 'react'
import { Calendar, DateRenderProps } from '../Calendar'
import { nextPage, Page } from '../lib'

const Date = ({ date }: DateRenderProps) => <button>{date.getDate()}</button>

export const Simple = () => {
	const [page, setPage] = useState<Page>({ month: 'may', year: 2022 })

	return (
		<div>
			{page.month + ' ' + page.year}
			<button onClick={() => setPage((current) => nextPage(current))}>⮕ </button>
			<Calendar page={page} renderDate={Date} />
		</div>
	)
}
