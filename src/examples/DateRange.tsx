import { useCallback, useState } from "react"
import { Calendar, DateRenderProps } from "../Calendar"
import { usePage } from "../usePage"

const inRange = (date: Date, range: Range) => {
    console.log(range.start, range.end, date >= range.start!, date <= range.end!);
    return !!(range.start && range.end && date >= range.start && date <= range.end);
}

interface CustomDateProps extends DateRenderProps {
    selected: boolean;
    onClick: (date: Date) => void;
}

const CustomDate = ({date, selected, belongsToPage, onClick}: CustomDateProps) => {
    return (
        <button
            style={{
                opacity: belongsToPage === "current" ? 1 : 0.2,
                borderWidth: selected ? 3 : 1,
            }}
            onClick={() => onClick(date)}
        >
            {date.getDate()}
        </button>
    )
}

interface Range {
    start?: Date;
    end?: Date;
}

const useRange = (initialDate: Range) => {
    const [range, setRange] = useState(initialDate);

    const extendRange = useCallback((date: Date) => {
        if (range.start === undefined) {
            setRange({ start: date, end: undefined });
        } else if (range.end === undefined) {
            setRange(({start}) => ({start, end: date }));
        } else {
            setRange(({start, end}) => {
                if (date < start!) {
                    return { start: date, end };
                } else {
                    return { start, end: date };
                }
           })
        }
     }, [range]);

    return {range, extendRange};
}

export const DateRange = () => {
    const [ page, { previous, next} ] = usePage({ month: "jun", year: 2022});
    const { range , extendRange } = useRange({start: undefined, end: undefined});

    return (
        <div>
            <h1>
                Selected Range: {
                    range.start?.toDateString() ?? "?"
                } to {
                    range.end?.toDateString() ?? "?"
                }
            </h1>
            <div>
                <button onClick={previous}>⬅</button>
                {page.month + " " + page.year}
                <button onClick={next}>⮕</button>
            </div>
            <Calendar
                page={page}
                renderDate={
                    (props) =>
                        <CustomDate
                            onClick={() => extendRange(props.date)}
                            selected={inRange(props.date, range)}
                            {...props}
                        />
                }
            />
        </div>
    )
}
