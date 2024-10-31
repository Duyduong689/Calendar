import { Dayjs } from "dayjs";

export interface CalendarDay {
    date: Dayjs;
    currentMonth: boolean;
}

export interface Event {
    id?: string; // MongoDB ObjectId represented as a string
    title: string;
    description?: string;
    eventType: string; // e.g., "meeting", "webinar", "general"
    recurrenceType: string; // e.g., "meeting", "webinar", "general"
    startDateTime: Date; // Event start time
    endDateTime: Date; // Event end time
    location?: string; // Optional: Location of the event
    isAllDay?: boolean; // Flag for all-day events
    themeColor: string; // Hex color code (e.g., "#4287f5")
    createdAt?: Date; // Date of creation
    updatedAt?: Date; // Date of last update
  }
  