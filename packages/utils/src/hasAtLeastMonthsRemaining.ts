import { parseISO, differenceInMonths } from "date-fns";

/**
 * @param date "2026-01-01"
 * @param months 6
 * @returns
 */
export function hasAtLeastMonthsRemaining(
  date: string,
  months: number
): boolean {
  const currentDate = new Date();
  const targetDate = parseISO(date);
  const diff = differenceInMonths(targetDate, currentDate);

  return diff >= months;
}
