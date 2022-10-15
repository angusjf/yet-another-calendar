import { CSSProperties, ReactNode, useCallback, useMemo, useState } from 'react'
import { Calendar, DateRenderProps, firstDate, nextPage, Page, previousPage } from 'yet-another-calendar'

const primary = '#00c67e'
const primaryTint = '#f2fffa'
const today = new Date()

const eq = (date1: Date, date2: Date) =>
	date1.getDate() === date2.getDate() &&
	date1.getMonth() === date2.getMonth() &&
	date1.getUTCFullYear() === date2.getUTCFullYear()

type Selected = 'start' | 'between' | 'end' | 'not' | 'startAndEnd'

const getSelected = (date: Date, range: Range): Selected => {
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

const isWeekend = (date: Date) => date.getDay() === 6 || date.getDay() === 0

type Range = undefined | { start: Date; } | { start: Date; end: Date; }

const useRange = (initialDate: Range) => {
	const [range, setRange] = useState(initialDate)
	const [selecting, setSelecting] = useState<'rangeStart' | 'rangeEnd'>('rangeStart')

	const changeRange = useCallback((date: Date) =>
		setRange(range => {
			if (range === undefined) {
				setSelecting('rangeEnd')
				return { start: date }
			}

			const { start } = range

			if (!('end' in range)) {
				if (selecting === 'rangeStart') {
					setSelecting('rangeEnd')
					return { start: date }
				} else {
					return { start, end: date }
				}
			}

			const { end } = range

			if (selecting === 'rangeStart') {
				setSelecting('rangeEnd')
				return { start: date, end }
			} else {
				return { start, end: date }
			}
		})
		, [selecting])

	return { range, changeRange, selecting, setSelecting }
}

export const TwoPage = () => {
	const [page, setPage] = useState<Page>({ month: 'jun', year: 2022 })

	const { range, changeRange, selecting, setSelecting } = useRange(undefined)

	const canGoBack = useMemo(() => {
		const pageStartDate = firstDate(page)
		if (range === undefined || selecting === 'rangeStart') {
			return pageStartDate <= today
		}
		return pageStartDate <= range.start
	}, [page, range, selecting])

	const isDisabled = useCallback((date: Date) => {
		if (isWeekend(date)) {
			return true;
		} else if (selecting === 'rangeStart') {
			if (range === undefined || !('end' in range)) {
				return false;
			} else {
				return date > range.end
			}
		} else {
			if (range === undefined) return false;
			return date < range.start;
		}
	}, [range, selecting])

	const renderDate = useCallback((props: DateRenderProps) =>
		<CustomDate
			onClick={() => changeRange(props.date)}
			selected={getSelected(props.date, range)}
			disabled={isDisabled(props.date)}
			{...props}
		/>, [changeRange, isDisabled, range])

	return (
		<FormWithPanel
			fields={<>
				<DateInput
					label="Arrival"
					onFocus={() => setSelecting('rangeStart')}
					selected={selecting === 'rangeStart'}
					value={range?.start?.toDateString() ?? '?'}
				/>
				<DateInput
					label="Departure"
					disabled={range === undefined}
					onFocus={() => setSelecting('rangeEnd')}
					selected={selecting === 'rangeEnd'}
					value={(range && 'end' in range) ? range.end.toDateString() : '?'}
				/>
			</>}
			panelHeader={<>
				<PageButton disabled={canGoBack} pos="left" onClick={() => setPage(previousPage)} />
				<PageTitle page={page} />
				<PageTitle page={nextPage(page)} />
				<PageButton pos="right" onClick={() => setPage(nextPage)} />
			</>}
			panel={<>
				<div style={{ marginRight: 25 }}>
					<WeekdayTitles />
					<Calendar page={page} renderDate={renderDate} />
				</div>
				<div>
					<WeekdayTitles />
					<Calendar page={nextPage(page)} renderDate={renderDate} />
				</div>
			</>}
		/>
	)
}

const PageTitle = ({ page }: { page: Page }) => (
	<div style={{ textTransform: 'uppercase' }}>{page.month + ' ' + page.year}</div>
)

const FormWithPanel = ({ fields, panel, panelHeader }: { fields: ReactNode, panel: ReactNode, panelHeader: ReactNode }) => (
	<div style={{
		display: 'flex',
		flexDirection: 'row',
		fontFamily: 'sans-serif',
		margin: 65, borderRadius: 5,
		boxShadow: '0 0 20px 20px #0000001a',
		padding: 30, width: 'fit-content'
	}}>
		<div style={{ marginRight: 25, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
			{fields}
		</div>
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative', height: 26, paddingBottom: 5 }}>
				{panelHeader}
			</div>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				{panel}
			</div>
		</div>
	</div>
)

const PageButton = (props: React.ComponentPropsWithoutRef<'button'> & { pos: "left" | "right" }) => {
	const { pos, style, ...rest } = props
	return <button
		style={{
			position: 'absolute',
			left: pos === 'right' ? 'auto' : 0,
			right: pos === 'left' ? 'auto' : 0,
			backgroundColor: 'transparent', borderWidth: 0, ...style
		}}
		{...rest}>
		{pos === 'left' ? '⬅' : '⮕'}
	</button>
}

const WeekdayTitles = () => (
	<div style={{
		gridTemplateColumns: 'repeat(7, 1fr)',
		display: 'grid', color: 'grey', gridGap: 4,
		textAlign: 'center', marginBottom: 5, fontSize: 12
	}}>
		{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
			(weekday) => <div key={weekday}>{weekday}</div>
		)}
	</div>
)

export const DateInput = ({ value, selected, onFocus, disabled, label }: {
	disabled?: boolean,
	value: string,
	selected: boolean,
	onFocus: () => void
	label: string
}) => {

	return <>
		<label htmlFor={label}>{label}:</label>
		<input
			readOnly
			id={label}
			value={value}
			onFocus={onFocus}
			onChange={() => undefined}
			style={{
				borderWidth: selected ? 3 : 1,
				borderRadius: 3,
				borderColor: selected ? primary : 'black',
				borderStyle: 'solid'
			}}
			disabled={disabled}
		/>
	</>
}

interface CustomDateProps extends DateRenderProps {
	selected: Selected;
	onClick: (date: Date) => void;
	disabled: boolean;
}

const a11yOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;

const CustomDate = ({ date, selected, belongsToPage, onClick, disabled }: CustomDateProps) => {
	const buttonStyle: CSSProperties = useMemo(() => {
		const shared: CSSProperties = {
			borderWidth: 1,
			marginLeft: 1,
			marginRight: 1,
			marginTop: -2,
			marginBottom: -2,
			backgroundColor: 'transparent',
			borderColor: 'rgba(0, 0, 0, 0.1)',
			borderTopStyle: 'none',
			borderBottomStyle: 'none',
			borderLeftStyle: 'none',
			borderRightStyle: 'none',
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
					borderRightStyle: 'solid',
					fontWeight: 'bold',
					color: primary,
				}
			case 'between':
				return {
					...shared,
					borderLeftStyle: 'solid',
					borderRightStyle: 'solid',
				}
			case 'end':
				return {
					...shared,
					marginRight: -1,
					borderLeftStyle: 'solid',
					fontWeight: 'bold',
					color: primary,
				}
			case 'not':
				return {
					...shared,
					marginTop: 0,
					borderRadius: 3,
					marginBottom: 0,
					borderTopStyle: 'solid',
					borderBottomStyle: 'solid',
					borderLeftStyle: 'solid',
					borderRightStyle: 'solid',
				}
		}
	}, [selected])

	const containerStyle: CSSProperties = useMemo(() => {
		const shared: CSSProperties = {
			borderWidth: 2,
			borderTopStyle: 'none',
			borderBottomStyle: 'none',
			borderLeftStyle: 'none',
			borderRightStyle: 'none',
			borderColor: primary,
		}

		switch (selected) {
			case 'startAndEnd':
				return {
					...shared,
					borderTopStyle: 'solid',
					borderBottomStyle: 'solid',
					borderLeftStyle: 'solid',
					borderRightStyle: 'solid',
					borderRadius: 5,
				}
			case 'start':
				return {
					...shared,
					borderLeftStyle: 'solid',
					borderTopStyle: 'solid',
					borderBottomStyle: 'solid',
					borderTopLeftRadius: 5,
					borderBottomLeftRadius: 5,
					backgroundColor: primaryTint,
				}
			case 'between':
				return {
					...shared,
					borderTopStyle: 'solid',
					borderBottomStyle: 'solid',
					backgroundColor: primaryTint,
				}
			case 'end':
				return {
					...shared,
					borderTopStyle: 'solid',
					borderRightStyle: 'solid',
					borderBottomStyle: 'solid',
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
					aria-label={"Select Date " + date.toLocaleDateString('en', a11yOptions)}
				>
					{date.getDate()}
				</button>
			</div>
		</div>
	)
}
