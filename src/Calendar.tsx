import React, { CSSProperties, Fragment, memo, useMemo } from 'react'
import {
	CalendarStartDay,
	getAllDatesOnPage,
	pageForDate,
	Page,
} from './lib'

export interface CalendarProps extends React.ComponentPropsWithRef<'div'> {
	page?: Page;
	renderDate?: (props: DateRenderProps) => JSX.Element;
	calendarStartDay?: CalendarStartDay;
}

export interface DateRenderProps {
	date: Date;
	belongsToPage: 'previous' | 'current' | 'next';
}

const getCalendarStyle = (style?: CSSProperties) => ({
	display: 'grid',
	gridTemplateColumns: 'repeat(7, 1fr)',
	gridTemplateRows: 'repeat(6, 1fr)',
	...style,
})

const defaultRenderDate = ({ date }: DateRenderProps) => (
	<button>{date.getDate()}</button>
)

const today = new Date()

const propsOrDefault = ({
	page,
	renderDate,
	calendarStartDay,
	...divProps
}: CalendarProps) => ({
	page: page ?? pageForDate(today),
	renderDate: renderDate ?? defaultRenderDate,
	calendarStartDay: calendarStartDay ?? 'monday',
	divProps: { ...divProps, style: getCalendarStyle(divProps.style) },
})

const Calendar = (props: CalendarProps) => {
	const {
		page,
		renderDate: Date,
		calendarStartDay,
		divProps,
	} = propsOrDefault(props)

	const dates = useMemo(() => {
		const { underflow, month, overflow } = getAllDatesOnPage(
			page,
			calendarStartDay
		)

		return [
			underflow.map((date) => (
				<Fragment key={date.toString()}>
					<Date date={date} belongsToPage='previous' />
				</Fragment>
			)),
			month.map((date) => (
				<Fragment key={date.toString()}>
					<Date date={date} belongsToPage='current' />
				</Fragment>
			)),
			overflow.map((date) => (
				<Fragment key={date.toString()}>
					<Date date={date} belongsToPage='next' />
				</Fragment>
			)),
		].flat()
	}, [page, Date, calendarStartDay])

	return <div {...divProps}>{dates}</div>
}

const MemoizedCalendar = memo(Calendar)

MemoizedCalendar.displayName = 'Calendar'

export { MemoizedCalendar as Calendar }
