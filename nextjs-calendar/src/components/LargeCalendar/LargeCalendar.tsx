'use client'

import { daysOfWeek, monthsOfYear } from '@/constants';
import { CalendarDay, Event, DisplayDateWithEvent } from '@/models/calendar.types';
import { fetchEvents } from '@/service';
import { generateCalendarDays } from '@/utils';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import useSWR, { mutate } from 'swr';
import EventForm from '../EventForm/EventForm';
import MonthSelection from '../MonthSelection/MonthSelection';
import SmallEventCard from '../SmallEventCard/SmallEventCard';
import Spinner from '../Spinner/Spinner';

const LargeCalendar: React.FC = () => {
    const [year, setYear] = useState(dayjs().year())
    const [month, setMonth] = useState(dayjs().month() + 1)
    const [isShow, setIsShow] = useState(false)
    const [formData, setFormData] = useState<Event>()
    const [shouldFetch, setShouldFetch] = useState(false);
    const [result, setResult] = useState<DisplayDateWithEvent[]>([]);

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

    const handleToday = () => {
        setMonth(dayjs().month() + 1)
        setYear(dayjs().year())
    }

    const checkCurrentDate = (day: CalendarDay) => {
        return dayjs().date() == day.date.date() && day.currentMonth && day.date.month() == dayjs().month() && day.date.year() == dayjs().year()
    }

    const handleViewEvent = (data: Event) => {
        setFormData(data)
        setIsShow(true)
    }

    const handleCreateEvent = () => {
        setFormData({
            title: '',
            description: '',
            eventType: 'event',
            recurrenceType: 'none',
            startDateTime: new Date(),
            endDateTime: new Date(),
            themeColor: 'yellow',
        })
        setIsShow(true)
    }

    const days = useMemo(
        () => generateCalendarDays(year, month, 5)
        , [year, month])

    const { data: events, error } = useSWR(shouldFetch ? "fetchEvents" : null, () => fetchEvents(year, month), {
        revalidateOnFocus: false,
    });

    useEffect(() => {
        mutate("fetchEvents")
        setShouldFetch(true)
    }, [month, year])

    useEffect(() => {
        if (events) {
            setResult(() => {
                let temp: DisplayDateWithEvent[] = []
                days.map((day) => {
                    temp.push({ day, events: [] })
                })
                temp.map((item, index) => {
                    events.map((event) => {
                        if (
                            item.day.date.isSame(dayjs(event.startDateTime), 'day')
                        ) {
                            temp[index].events?.push(event)
                        }
                    })
                })
                return [...temp]
            })
        }
    }, [events])

    return (
        <div className='bg-white rounded-md pt-3 flex flex-col'>
            <div className='filter-paging px-6 my-2 flex'>
                <div className='text-blue-800 flex gap-3 items-center flex-1'>
                    <div className='px-3 py-1  font-semibold border-blue-800 border-2 rounded-xl w-fit cursor-pointer' onClick={handleToday}>
                        Today
                    </div>
                    <div className=' w-[35px] flex justify-center py-2 cursor-pointer' onClick={handlePrevMonth}>
                        <MdArrowBackIosNew className=' text-xl ' />
                    </div>
                    <div className=' w-[35px] flex justify-center py-2 cursor-pointer' onClick={handleNextMonth}>
                        <MdArrowForwardIos className=' text-xl ' />
                    </div>
                    <div className=' font-bold flex gap-2 text-2xl'>
                        <span>
                            {monthsOfYear[month - 1]}
                        </span>
                        <span>
                            {year}
                        </span>
                    </div>
                    <div className='ml-2 px-3 py-1  font-semibold border-blue-800 border-2 rounded-xl w-fit cursor-pointer hover:text-white hover:bg-blue-800' onClick={handleCreateEvent}>
                        Create Event
                    </div>
                    <EventForm isShow={isShow} setIsShow={setIsShow} data={formData} />
                </div>
                <MonthSelection setSelectedMonth={setMonth} selectedMonth={month} />
            </div>
            <div className='header grid grid-cols-7 justify-around text-xl text-gray-400'>
                {daysOfWeek.map((day) =>
                    <div className='py-2 text-center' key={day}>{day}</div>
                )}
            </div>
            {
                !events && !error ?
                    <div className=' h-[82.25vh]'>
                        <Spinner />
                    </div>
                    :
                    <div className='content grid grid-cols-7 justify-around text-xl text-gray-500'>
                        {result.map((item, index) => (
                            <div
                                key={index}
                                className={`calendar-cell ${item.day.currentMonth ? '' : ' text-gray-300 cursor-not-allowed'} border-[1px] py-2 border-gray-200 justify-start min-h-[130px] cursor-pointer flex flex-col items-center gap-1`}
                            >
                                <div className={`date ${checkCurrentDate(item.day) ? 'text-white bg-blue-800 rounded-[50%]' : ''} flex items-center justify-center w-[40px] h-[40px]`}>
                                    {item.day.date.date()}
                                </div>
                                <div className='events flex flex-col w-full'>
                                    <div className=" flex gap-1 flex-col">
                                        {
                                            item.events && item.events.slice(0, 2).map((event, index) =>
                                                <div key={index} onClick={() => handleViewEvent(event)}>
                                                    <SmallEventCard event={event} />
                                                </div>
                                            )
                                        }
                                    </div>
                                    {
                                        item.events && item.events.length > 2 &&
                                        <Link href={"/"} className='text-blue-500 cursor-pointer text-sm font-semibold ml-2 mt-1'>{item.events.length - 2} more </Link>
                                    }
                                </div>

                            </div>
                        ))}
                    </div>
            }

        </div >
    )
}

export default LargeCalendar