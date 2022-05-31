import React from "react";
import {
  monthToNumber,
  Month,
  getStartDate,
  getEndDate,
  getDatesInRange,
} from "./helpers";

interface CalendarProps {
  page: {
    year: number;
    month: Month;
  };
}

export function Calendar(props: CalendarProps) {
  const startDate = getStartDate(props.page.year, props.page.month);

  const endDate = getEndDate(props.page.year, props.page.month);

  const month = getDatesInRange(startDate, endDate);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
      {"it is the month of " + props.page.month + " " + props.page.year}

      {month.map((n) => (
        <button type="button">{n.getDate()}</button>
      ))}
    </div>
  );
}
