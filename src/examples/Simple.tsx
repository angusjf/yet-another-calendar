import { Calendar } from "../Calendar"
import { usePage } from "../usePage"

const CustomDate = ({date}: {date: Date}) => {
    return <button>{date.getDate()}</button>
}

export const Simple = () => {
    const [ page, { previous, next} ] = usePage({ month: "may", year: 2022});

    return (
        <div>
            <div>
                <button onClick={previous}>⬅ </button>
                {page.month + " " + page.year}
                <button onClick={next}>⮕ </button>
            </div>
            <Calendar page={page} renderDate={CustomDate} />
        </div>
    )
}
