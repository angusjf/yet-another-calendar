import { useState } from "react"
import { Calendar, DateRenderProps } from "../Calendar"
import { usePage } from "../usePage"

const today: Date = new Date();

const eq = (date1: Date, date2: Date) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getUTCFullYear() === date2.getUTCFullYear();

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

export const DatePicker = () => {
    const [ page, { previous, next} ] = usePage({ month: "jun", year: 2022});
    const [date, setDate] = useState(today);

    return (
        <div>
            <h1>Selected: {date.toDateString()}</h1>
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
                            onClick={setDate}
                            selected={eq(props.date, date)}
                            {...props}
                        />
                }
            />
        </div>
    )
}
