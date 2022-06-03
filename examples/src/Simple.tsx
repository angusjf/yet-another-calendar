import { useState } from 'react'
import { Calendar, DateRenderProps, nextPage, Page } from 'yet-another-calendar'

const Date = ({ date }: DateRenderProps) => <button>{date.getDate()}</button>

export const Simple = () => {
	const [page, setPage] = useState<Page>({ month: 'may', year: 2022 })

	return (
		<div>
			{page.month} {page.year}
			<button onClick={() => setPage(nextPage)}>⮕</button>
			<Calendar page={page} renderDate={Date} />
		</div>
	)
}
