export interface Page {
    month: Month;
    year: number;
}

export type CalendarStartDay = "monday" | "sunday"

type Month =
    | "jan"
    | "feb"
    | "mar"
    | "apr"
    | "may"
    | "jun"
    | "jul"
    | "aug"
    | "sep"
    | "oct"
    | "nov"
    | "dec";

const monthFromNumber = (n: number): Month => {
    if (n === 0) {
        return "jan";
    }
    if (n === 1) {
        return "feb";
    }
    if (n === 2) {
        return "mar";
    }
    if (n === 3) {
        return "apr";
    }
    if (n === 4) {
        return "may";
    }
    if (n === 5) {
        return "jun";
    }
    if (n === 6) {
        return "jul";
    }
    if (n === 7) {
        return "aug";
    }
    if (n === 8) {
        return "sep";
    }
    if (n === 9) {
        return "oct";
    }
    if (n === 10) {
        return "nov";
    }
    return "dec";
}

function monthToNumber(month: Month): number {
    if (month === "jan") {
        return 0;
    }
    if (month === "feb") {
        return 1;
    }
    if (month === "mar") {
        return 2;
    }
    if (month === "apr") {
        return 3;
    }
    if (month === "may") {
        return 4;
    }
    if (month === "jun") {
        return 5;
    }
    if (month === "jul") {
        return 6;
    }
    if (month === "aug") {
        return 7;
    }
    if (month === "sep") {
        return 8;
    }
    if (month === "oct") {
        return 9;
    }
    if (month === "nov") {
        return 10;
    }
    return 11;
}

function nextMonth(month: Month): Month {
    if (month === "jan") {
        return "feb";
    }
    if (month === "feb") {
        return "mar";
    }
    if (month === "mar") {
        return "apr";
    }
    if (month === "apr") {
        return "may";
    }
    if (month === "may") {
        return "jun";
    }
    if (month === "jun") {
        return "jul";
    }
    if (month === "jul") {
        return "aug";
    }
    if (month === "aug") {
        return "sep";
    }
    if (month === "sep") {
        return "oct";
    }
    if (month === "oct") {
        return "nov";
    }
    if (month === "nov") {
        return "dec";
    }
    return "jan";
}

function previousMonth(month: Month): Month {
    if (month === "jan") { return "dec"; }
    if (month === "feb") { return "jan"; }
    if (month === "mar") { return "feb"; }
    if (month === "apr") { return "mar"; }
    if (month === "may") { return "apr"; }
    if (month === "jun") { return "may"; }
    if (month === "jul") { return "jun"; }
    if (month === "aug") { return "jul"; }
    if (month === "sep") { return "aug"; }
    if (month === "oct") { return "sep"; }
    if (month === "nov") { return "oct"; }
    return "nov";
}

function getStartDate(year: number, month: Month): Date {
    return new Date(year, monthToNumber(month), 1);
}

function getEndDate(year: number, month: Month): Date {
    const endDate = getStartDate(year, nextMonth(month));

    endDate.setDate(endDate.getDate() - 1);
    return endDate;
}

function getDatesInRange(startDate: Date, endDate: Date): Date[] {
    const datesInRange = [];

    for (const d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        datesInRange.push(new Date(d));
    }

    return datesInRange;
}

export const getPageForTodaysDate = (): Page => {
    const now = new Date();
    return { month: monthFromNumber(now.getMonth()), year: now.getFullYear() };
}

const getUnderflow = (startDate: Date, calendarStartDay: CalendarStartDay) => {
    const underflow = [];
    const d = new Date(startDate);

    const dayNumberToStopAt = calendarStartDay === "sunday" ? 0 : 1;

    while (d.getDay() !== dayNumberToStopAt) {
        d.setDate(d.getDate() - 1)
        underflow.push(new Date(d));
    }

    return underflow.reverse();
};

const getOverflow = (endDate: Date, numberOfDays: number) => {
    const underflow = [];
    const d = new Date(endDate);

    for (let n = 0; n < numberOfDays; n += 1) {
        d.setDate(d.getDate() + 1)
        underflow.push(new Date(d));
    }

    return underflow;
};

export const getAllDatesOnPage = (page: Page, calendarStartDay: CalendarStartDay): { underflow: Date[], month: Date[], overflow: Date[] } => {
    const startDate = getStartDate(page.year, page.month);

    const endDate = getEndDate(page.year, page.month);

    const underflow = getUnderflow(startDate, calendarStartDay);

    const month = getDatesInRange(startDate, endDate);

    const overflow = getOverflow(endDate, 6 * 7 - underflow.length - month.length);

    return {underflow, month, overflow};
}

export const nextPage = (page: Page): Page => {
    const newMonth = nextMonth(page.month);

    if (newMonth === 'jan') {
        return {month: newMonth, year: page.year + 1}
    } else {
        return {month: newMonth, year: page.year}
    }
}

export const previousPage = (page: Page): Page => {
    const newMonth = previousMonth(page.month);

    if (newMonth === 'dec') {
        return {month: newMonth, year: page.year - 1}
    } else {
        return {month: newMonth, year: page.year}
    }
}
