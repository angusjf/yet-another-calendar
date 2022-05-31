export type Month =
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

export function monthToNumber(month: Month): number {
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

export function nextMonth(month: Month): Month {
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

export function getStartDate(year: number, month: Month): Date {
  return new Date(year, monthToNumber(month), 1);
}

export function getEndDate(year: number, month: Month): Date {
  const endDate = getStartDate(year, nextMonth(month));

  endDate.setDate(endDate.getDate() - 1);
  return endDate;
}

export function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const currentDate = startDate;
  let listOfDays = [];
  listOfDays.push(new Date(currentDate));

  while (currentDate < endDate) {
    currentDate.setDate(currentDate.getDate() + 1);
    listOfDays.push(new Date(currentDate));
  }
  return listOfDays;
}
