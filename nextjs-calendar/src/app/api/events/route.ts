import { NextResponse } from 'next/server';
import prisma from '@/utils/connect'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || '');
    const month = parseInt(searchParams.get('month') || '');

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        return NextResponse.json(
            { error: 'Invalid year or month parameter' },
            { status: 400 }
        );
    }

    try {
        const startOfMonth = dayjs().utc().year(year).month(month - 1).startOf('month').toDate();
        const endOfMonth = dayjs().utc().year(year).month(month - 1).endOf('month').toDate();

        const events = await prisma.event.findMany({
            where: {
                startDateTime: {
                    gte: startOfMonth,
                    lt: endOfMonth,
                },
            },
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to retrieve events' },
            { status: 500 }
        );
    }
}

type EventData = {
    id?: string;
    title: string;
    description: string;
    eventType: string;
    recurrenceType: string;
    startDateTime: string;
    endDateTime: string;
    themeColor: string;
    createdAt?: string;
    updatedAt?: string;
};

export async function POST(request: Request) {
    const { title, description, eventType, startDateTime, endDateTime, themeColor, recurrenceType }: EventData = await request.json();

    try {
        const result = await prisma.event.create({
            data: {
                title,
                description,
                eventType,
                startDateTime: new Date(startDateTime),
                endDateTime: new Date(endDateTime),
                themeColor,
                recurrenceType
            },
        });

        if (recurrenceType !== 'none') {
            const frequency = recurrenceType === 'weekly' ? 7 : 30;
            let nextOccurrence = dayjs(startDateTime);
            const recurrenceLimit = 5

            for (let i = 0; i < recurrenceLimit; i++) {
                nextOccurrence = nextOccurrence.add(frequency, 'day');
                const newStartDateTime = nextOccurrence.toDate();
                const newEndDateTime = dayjs(newStartDateTime).add(dayjs(endDateTime).diff(dayjs(startDateTime)), 'millisecond').toDate(); // Preserve duration

                await prisma.event.create({
                    data: {
                        title,
                        description,
                        eventType,
                        startDateTime: newStartDateTime,
                        endDateTime: newEndDateTime,
                        themeColor,
                        recurrenceType, // Keep recurrence type for these occurrences
                    },
                });
            }
        }

        return NextResponse.json({ message: 'Event created successfully!', event: result });

    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Something went wrong!' },
            { status: 500 }
        );
    }

}

export async function PATCH(request: Request) {
    const payload = await request.json();
    console.log("Payload received:", payload);
    
    if (!payload) {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { id, title, description, eventType, startDateTime, endDateTime, themeColor, recurrenceType } = payload;

    try {
        const currentEvent = await prisma.event.findUnique({ where: { id } });

        // if (currentEvent && currentEvent.recurrenceType && recurrenceType === 'none') {
        //     await prisma.event.deleteMany({
        //         where: {
        //             startDateTime: {
        //                 gte: dayjs(currentEvent.startDateTime).toDate(), // Start from the current event's start time
        //             },
        //             recurrenceType: currentEvent.recurrenceType,
        //         },
        //     });
        // }

        // Update the main event
        if (currentEvent) {
            const updatedEvent = await prisma.event.update({
                where: { id },
                data: {
                    title,
                    description,
                    eventType,
                    startDateTime: new Date(startDateTime),
                    endDateTime: new Date(endDateTime),
                    themeColor,
                    recurrenceType,
                },
            });
            if(updatedEvent) return NextResponse.json({ message: 'Event updated successfully!' });
        }

    } catch (error) {
        console.error('Event update error:', error);
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
    }
}
