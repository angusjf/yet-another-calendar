import { CSSProperties, Fragment, useMemo } from "react";
import {
    CalendarStartDay,
    getAllDatesOnPage,
    getPageForTodaysDate,
    Page
} from "./helpers";

interface CalendarProps {
    page?: Page;
    style?: CSSProperties;
    renderDate?: (props: { date: Date }) => JSX.Element;
    calendarStartDay?: CalendarStartDay;
}

const getCalendarStyle = (style?: CSSProperties) => ({
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "repeat(6, 1fr)",
    ...style
});

const defaultRenderDate = ({ date }: { date: Date }) => <button>{date.getDate()}</button>

export function Calendar(props: CalendarProps) {
    const page = props.page ?? getPageForTodaysDate();
    const renderDate = props.renderDate ?? defaultRenderDate;
    const style = getCalendarStyle(props.style);
    const calendarStartDay = props.calendarStartDay ?? "monday";

    const dates = useMemo(
        () => getAllDatesOnPage(page, calendarStartDay).map(
            date => <Fragment key={date.toString()}>
                {renderDate({ date })}
            </Fragment>
        )
        , [page, renderDate, calendarStartDay]);

    return (
        <>
            {"it is the month of " + page.month + " " + page.year}
            <div style={style}> {dates} </div>
        </>
    );
}
