'use client'

import { daysOfWeek, monthsOfYear } from "@/constants"
import { CalendarDay, Event } from "@/models/calendar.types"
import { generateCalendarDays } from "@/utils"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'; // Import the UTC plugin
import { useState } from "react"
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md"
import useSWR from "swr"
import LargeEventCard from "../LargeEventCard/LargeEventCard"
import Spinner from "../Spinner/Spinner"
dayjs.extend(utc);

const fetchEventsByDate = async (date: Date): Promise<Event[]> => {
  console.log("🚀 ~ fetchEventsByDate ~ date:", date)
  console.log("🚀 ~ fetchEventsByDate ~ date2:", dayjs.utc(date).toISOString())
  const formattedDate = dayjs(date).toISOString();
  const response = await fetch(`/api/eventsByDate?date=${formattedDate}`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
}

const SmallCalendar = () => {
  const [year, setYear] = useState(dayjs().year())
  const [month, setMonth] = useState(dayjs().month() + 1)
  const [selectedDate, SetSelectedDate] = useState(dayjs())

  const handlePrevMonth = () => {
    if (month > 1) {
      setMonth(month - 1);
    } else {
      setYear(year - 1)
      setMonth(12);
    }
  }

  const handleNextMonth = () => {
    if (month < 12) {
      setMonth(month + 1);
    } else {
      setYear(year + 1)
      setMonth(1);
    }
  }

  const checkCurrentDate = (day: CalendarDay) => {
    return dayjs().date() == day.date.date() && day.currentMonth && day.date.month() == dayjs().month() && day.date.year() == dayjs().year()
  }

  const checkSelectedDate = (day: CalendarDay) => {
    return selectedDate.date() == day.date.date() && day.currentMonth && day.date.month() == selectedDate.month() && day.date.year() == selectedDate.year()
  }

  const days = generateCalendarDays(year, month, 5);

  const { data: events, error } = useSWR([selectedDate.toDate()], () => fetchEventsByDate(selectedDate.toDate()), {
    revalidateOnFocus: false,
  });

  if (error) return <div>Error loading events: {error.message}</div>; // Show error message

  return (
    <div className='bg-white rounded-md pt-3 min-h-[550px]'>
      <div className="calendar py-2">
        <div className='filter-paging px-6 py-3 flex'>
          <div className='text-blue-800 flex gap-3 items-center justify-center flex-1'>
            <div className=' w-[35px] flex justify-center py-2 cursor-pointer' onClick={handlePrevMonth}>
              <MdArrowBackIosNew className=' text-xl ' />
            </div>
            <div className=' min-w-[120px] font-extrabold flex justify-center gap-2 text-xl'>
              <span>
                {monthsOfYear[month - 1].slice(0, 3)}
              </span>
              <span>
                {year}
              </span>
            </div>
            <div className=' w-[35px] flex justify-center py-2 cursor-pointer' onClick={handleNextMonth}>
              <MdArrowForwardIos className=' text-xl ' />
            </div>
          </div>
        </div>
        <div className="wrapper px-8">
          <div className='header grid grid-cols-7 justify-around text-gray-400'>
            {daysOfWeek.map((day) =>
              <div className='py-2 text-sm text-center uppercase font-bold' key={day}>{day}</div>
            )}
          </div>
          <div className='content grid grid-cols-7 justify-around text-sm text-gray-500'>
            {days.map((day, index) => (
              <div
                key={index}
                className={`calendar-cell ${day.currentMonth ? '' : ' text-gray-300 cursor-not-allowed'} py-2 flex items-start justify-center  min-h-[50px] cursor-pointer`}
                onClick={() => SetSelectedDate(dayjs().isSame(day.date, 'day') ? dayjs() : day.date)}
              >
                <div className={`${checkCurrentDate(day) ? 'text-white bg-blue-800 rounded-[50%]' : ''} ${checkSelectedDate(day) ? 'text-white bg-red-800 rounded-[50%]' : ''} flex items-center justify-center w-[30px] h-[30px]`}>
                  {day.date.date()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="upComing-events border-gray-300 border-t-2 px-4 py-5">
        <div className="title flex">
          <h2 className="flex-1 text-blue-800 text-2xl font-bold">Upcoming Events</h2>
          <div className=" rounded-2xl bg-blue-800 text-white px-4 py-1 cursor-pointer h-fit">
            View All
          </div>
        </div>
        <div className="exact-date text-xl text-gray-400 mt-3 font-semibold">
          <span>
            {selectedDate.date() == dayjs().date() ? 'Today,' : ''} {selectedDate.date()} {monthsOfYear[month - 1].slice(0, 3)}
          </span>
        </div>
        <div className="flex gap-3 flex-col mt-4">
          {
            (!events && !error) ? <Spinner /> :
              events && events.map((event, index) =>
                <LargeEventCard key={event.id} event={event} />
              )
          }
        </div>
      </div>
    </div>
  )
}

export default SmallCalendar