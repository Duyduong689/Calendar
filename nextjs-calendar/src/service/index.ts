import { Event } from "@/models/calendar.types";
import dayjs from "dayjs";

export const fetchEventsByDate = async (date: Date): Promise<Event[]> => {
    const formattedDate = dayjs(date).toISOString();
    const response = await fetch(`/api/eventsByDate?date=${formattedDate}`);
    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    return response.json();
}

export const fetchEvents = async (year: number, month: number): Promise<Event[]> => {
    const response = await fetch(`/api/events?year=${year}&month=${month}`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
};