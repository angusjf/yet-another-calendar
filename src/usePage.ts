import { Reducer, useCallback, useReducer } from 'react'
import { Page, nextPage, previousPage, pageForDate } from './lib'

type Action
 = { type: 'previous' }
 | { type:  'next' }
 | { type: 'setPage', payload: Page };

const pageReducer: Reducer<Page, Action> = (page, action) => {
	switch (action.type) {
	case 'next':
		return nextPage(page)
	case 'previous':
		return previousPage(page)
	case 'setPage':
		return action.payload
	}
}

interface PageFunctions {
    next: () => void;
    previous: () => void;
    setPage: (page: Page) => void;
    focusDate: (date: Date) => void;
}

export const usePage = (initialPage: Page): [Page, PageFunctions] => {
	const [page, dispatch] = useReducer(pageReducer, initialPage)

	const next = useCallback(() => dispatch({ type: 'next' }), [])

	const previous = useCallback(() => dispatch({ type: 'previous' }), [])

	const setPage = useCallback(
		(newPage: Page) => dispatch({ type: 'setPage', payload: newPage }),
		[]
	)

	const focusDate = useCallback(
		(date: Date) => setPage(pageForDate(date)),
		[setPage]
	)

	return [page, { next, previous, setPage, focusDate }]
}
