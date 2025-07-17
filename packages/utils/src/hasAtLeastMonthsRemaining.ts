import { differenceInMonths } from "date-fns";

export function hasAtLeastMonthsRemaining(
  date: string,
  months: number
): boolean {
  const currentDate = new Date();
  const targetDate = new Date(date);
  const diff = differenceInMonths(targetDate, currentDate);

  return diff >= months;
}
