import { CSSProperties, Fragment, memo, useMemo } from 'react'
import {
	CalendarStartDay,
	getAllDatesOnPage,
	pageForDate,
	Page,
} from './lib'

export interface CalendarProps {
  page?: Page;
  style?: CSSProperties;
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

const Calendar = (props: CalendarProps) => {
	const page = props.page ?? pageForDate(today)
	const renderDate = props.renderDate ?? defaultRenderDate
	const style = getCalendarStyle(props.style)
	const calendarStartDay = props.calendarStartDay ?? 'monday'

	const dates = useMemo(() => {
		const { underflow, month, overflow } = getAllDatesOnPage(
			page,
			calendarStartDay
		)

		return [
			underflow.map((date) => (
				<Fragment key={date.toString()}>
					{renderDate({ date, belongsToPage: 'previous' })}
				</Fragment>
			)),
			month.map((date) => (
				<Fragment key={date.toString()}>
					{renderDate({ date, belongsToPage: 'current' })}
				</Fragment>
			)),
			overflow.map((date) => (
				<Fragment key={date.toString()}>
					{renderDate({ date, belongsToPage: 'next' })}
				</Fragment>
			)),
		].flat()
	}, [page, renderDate, calendarStartDay])

	return <div style={style}>{dates}</div>
}

const MemoizedCalendar = memo(Calendar, (prevProps, nextProps) => {
	const propsAreEqual = 
		nextProps.calendarStartDay === prevProps.calendarStartDay
		&& nextProps.page?.month === prevProps.page?.month
		&& nextProps.page?.year === prevProps.page?.year
		&& nextProps.renderDate === prevProps.renderDate
		&& nextProps.style === prevProps.style
	
	return propsAreEqual
})

MemoizedCalendar.displayName = 'Calendar'

export { MemoizedCalendar as Calendar }
