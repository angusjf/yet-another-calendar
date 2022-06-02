import { ReactNode, useCallback, useMemo, useState } from 'react'
import { Calendar, DateRenderProps } from '../Calendar'
import { getFirstDate, nextPage } from '../lib'
import { usePage } from '../usePage'

const primary = '#00c67e'
const primaryTint = '#f2fffa'
const today = new Date()

const eq = (date1: Date, date2: Date) =>
	date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getUTCFullYear() === date2.getUTCFullYear()

const getRange = (date: Date, range: Range) => {
	if (range === undefined) {
		return 'not'
	}
    
	if (!('end' in range) || eq(range.start, range.end)) {
		return eq(date, range.start) ? 'startAndEnd' : 'not'
	}

	if (eq(date, range.start)) {
		return 'start'
	} else if (eq(date, range.end)) {
		return 'end'
	} else if (date >= range.start && date <= range.end) {
		return 'between'
	} else {
		return 'not'
	}
}

interface CustomDateProps extends DateRenderProps {
    selected: 'start' | 'between' | 'end' | 'not' | 'startAndEnd';
    onClick: (date: Date) => void;
    disabled: boolean;
}

const isWeekend = (date: Date) => date.getDay() === 6 || date.getDay() === 0

const CustomDate = ({ date, selected, belongsToPage, onClick, disabled }: CustomDateProps) => {

	const buttonStyle = useMemo(() => {
		const shared = {
			borderWidth: 1,
			marginLeft: 1,
			marginRight: 1,
			marginTop: -2,
			marginBottom: -2,
			backgroundColor: 'transparent',
			borderColor: 'rgba(0, 0, 0, 0.1)',
			borderStyle: 'none',
			width: 40,
			height: 40
		}

		switch (selected) {
		case 'startAndEnd':
			return {
				...shared,
				marginLeft: -1,
				marginRight: -1,
				fontWeight: 'bold',
				color: primary,
			}
		case 'start':
			return {
				...shared,
				marginLeft: -1,
				borderRightStyle: 'solid' as const,
				fontWeight: 'bold',
				color: primary,
			}
		case 'between':
			return {
				...shared,
				borderLeftStyle: 'solid' as const,
				borderRightStyle: 'solid' as const,
			}
		case 'end':
			return {
				...shared,
				marginRight: -1,
				borderLeftStyle: 'solid' as const,
				fontWeight: 'bold',
				color: primary,
			}
		case 'not':
			return {
				...shared,
				marginTop: 0,
				borderRadius: 3,
				marginBottom: 0,
				borderStyle: 'solid',
			}
		}
	}, [selected])

	const containerStyle = useMemo(() => {
		const shared = {
			borderWidth: 2,
			borderStyle: 'none',
			borderColor: primary,
		}

		switch (selected) {
		case 'startAndEnd':
			return {
				...shared,
				borderStyle: 'solid' as const,
				borderRadius: 5,
				backgroundColor: primaryTint,
			}
		case 'start':
			return {
				...shared,
				borderLeftStyle: 'solid' as const,
				borderTopStyle: 'solid' as const,
				borderBottomStyle: 'solid' as const,
				borderTopLeftRadius: 5,
				borderBottomLeftRadius: 5,
				backgroundColor: primaryTint,
			}
		case 'between':
			return {
				...shared,
				borderTopStyle: 'solid' as const,
				borderBottomStyle: 'solid' as const,
				backgroundColor: primaryTint,
			}
		case 'end':
			return {
				...shared,
				borderTopStyle: 'solid' as const,
				borderRightStyle: 'solid' as const,
				borderBottomStyle: 'solid' as const,
				borderTopRightRadius: 5,
				borderBottomRightRadius: 5,
				backgroundColor: primaryTint,
			}
		case 'not':
			return {
				...shared,
			}
		}
	}, [selected])

	return (
		<div style={{ marginBottom: 1, marginTop: 1, visibility: belongsToPage === 'current' ? 'visible' : 'hidden', }}>
			<div style={containerStyle}>
				<button
					style={buttonStyle}
					onClick={() => onClick(date)}
					disabled={disabled}
				>
					{date.getDate()}
				</button>
			</div>
		</div>
	)
}

type Range = undefined | { start: Date; } | { start: Date; end: Date; }

const useRange = (initialDate: Range) => {
	const [range, setRange] = useState(initialDate)
	const [selecting, setSelecting] = useState<'rangeStart' | 'rangeEnd'>('rangeStart')

	const extendRange = useCallback((date: Date) =>
		setRange(range => {
			if (range === undefined) {
				setSelecting('rangeEnd')
				return { start: date }
			}

			const { start } = range

			if (!('end' in range)) {
				if (selecting === 'rangeStart') {
					return { start: date }
				} else {
					return { start, end: date }
				}
			}

			const { end } = range

			if (selecting === 'rangeStart') {
				return { start: date, end }
			} else {
				return { start, end: date }
			}
		})
	, [selecting])

	return { range, extendRange, selecting, setSelecting }
}

const WeekdayTitles = () => (
	<div style={{ gridTemplateColumns: 'repeat(7, 1fr)', display: 'grid', color: 'grey', gridGap: 4, textAlign: 'center', marginBottom: 5, fontSize: 12 }}>
		{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
			(weekday) => <div key={weekday}>{weekday}</div>
		)}
	</div>
)

export const DateInput = ({value, selected, onFocus, disabled}: {disabled?: boolean, value: string, selected: boolean, onFocus: () => void}) => {
	return <input readOnly value={value} onFocus={onFocus} onChange={() => undefined} style={{ borderWidth: selected ? 3 : 1, borderRadius: 3, borderColor: primary, borderStyle: 'solid'}} disabled={disabled} />
}

export const TwoPage = () => {
	const [page, { previous, next }] = usePage({ month: 'jun', year: 2022 })
	const { range, extendRange, selecting, setSelecting } = useRange(undefined)
	const canGoBack = useMemo(() => {
		const pageStartDate = getFirstDate(page)
		if (range === undefined) {
			return pageStartDate <= today
		}
		return pageStartDate <= range.start
	}, [range, page])

	return (
		<FormWithPanel
			fields={
				<>
					<DateInput onFocus={()=>setSelecting('rangeStart')} selected={selecting === 'rangeStart'} value={range?.start?.toDateString() ?? '?'} />
					<DateInput disabled={range === undefined} onFocus={()=>setSelecting('rangeEnd')} selected={selecting === 'rangeEnd'} value={(range && 'end' in range) ? range.end.toDateString() : '?'} />
				</>
			}
			panelHeader={
				<>
					<PageButton disabled={canGoBack} style={{ position: 'absolute', left: 0 }} onClick={previous}>⬅ </PageButton>
					<div style={{textTransform: 'uppercase'}}>{page.month + ' ' + page.year}</div>
					<div style={{textTransform: 'uppercase'}}>{nextPage(page).month + ' ' + nextPage(page).year}</div>
					<PageButton style={{ position: 'absolute', right: 0 }} onClick={next}>⮕ </PageButton>
				</>
			}
			panel={
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<div style={{ marginRight: 25 }}>
						<WeekdayTitles />
						<Calendar
							page={page}
							renderDate={
								(props) =>
									<CustomDate
										onClick={() => extendRange(props.date)}
										selected={getRange(props.date, range)}
										{...props}
										disabled={
											(() => {
												if (isWeekend(props.date)) {
													return true
												}
												if (range === undefined) {
													return false
												}
												return props.date < range.start
											})()
										}
									/>
							}
						/>
					</div>
					<div>
						<WeekdayTitles />
						<Calendar
							page={nextPage(page)}
							renderDate={
								(props) =>
									<CustomDate
										onClick={() => extendRange(props.date)}
										selected={getRange(props.date, range)}
										disabled={
											(() => {
												if (isWeekend(props.date)) {
													return true
												}
												if (range === undefined) {
													return false
												}
												return props.date < range.start
											})()
										}
										{...props}
									/>
							}
						/>
					</div>
				</div>
			}
		/>
	)
}

const FormWithPanel = ({ fields, panel, panelHeader }: { fields: ReactNode, panel: ReactNode, panelHeader: ReactNode }) => (
	<div style={{ display: 'flex', flexDirection: 'row', fontFamily: 'sans-serif', margin: 65, borderRadius: 5, boxShadow: '0 0 20px 20px #0000001a', padding: 30,  width: 'fit-content' }}>
		<div style={{ marginRight: 25, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
			{fields}
		</div>
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative', height: 26, paddingBottom: 5 }}>
				{panelHeader}
			</div>
			{panel}
		</div>
	</div>
)

const PageButton = (props: React.ComponentPropsWithoutRef<'button'>) => {
	const {style, ...rest} = props
	return <button style={{backgroundColor: 'transparent', borderWidth: 0, ...style}} {...rest}></button>
}
