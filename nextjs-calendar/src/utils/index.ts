import { CalendarDay } from '@/models/calendar.types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function generateCalendarDays(year: number, month: number, numOfRow = 6): CalendarDay[] {
  const startOfMonth = dayjs(`${year}-${month}-01`);
  const endOfMonth = startOfMonth.endOf('month');
  const startDayOfWeek = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const days: CalendarDay[] = [];

  const prevMonthDaysCount = startDayOfWeek;
  const endOfPrevMonth = startOfMonth.subtract(1, 'month').endOf('month');

  for (let i = prevMonthDaysCount - 1; i >= 0; i--) {
    days.push({
      date: endOfPrevMonth.subtract(i, 'day'),
      currentMonth: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: dayjs.utc(`${year}-${month}-${i}`),
      currentMonth: true,
    });
  }

  const remainingCells = numOfRow * 7 - days.length; // 7*numOfRow cells total in 7*numOfRow grid
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: endOfMonth.add(i, 'day'),
      currentMonth: false,
    });
  }

  return days;
}

export function getDateTimeWithGMT(dateTime: Date): { gmtOffsetString: string } {
  const time = dayjs(dateTime);

  const gmtOffset = time.utcOffset(); // offset in minutes
  const gmtOffsetHours = Math.floor(gmtOffset / 60); // Convert to hours

  const gmtOffsetString = `GMT${gmtOffset >= 0 ? '+' : '-'}${Math.abs(gmtOffsetHours)}`;

  return {
    gmtOffsetString,
  };
}