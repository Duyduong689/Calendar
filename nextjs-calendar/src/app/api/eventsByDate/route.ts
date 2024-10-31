
import prisma from '@/utils/connect';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { NextResponse } from 'next/server';
dayjs.extend(utc);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = (searchParams.get('date') || '');

    if (typeof date !== 'string') {
        return NextResponse.json(
            { error: 'Invalid date parameter' },
            { status: 400 }
        );
    }

    try {
        let startOfDay, endOfDay
        if (dayjs().isSame(date, 'day')) {
            startOfDay = dayjs(date).toDate();
            endOfDay = dayjs.utc(date).endOf('day').toDate();
        }
        else {
            startOfDay = dayjs.utc(date).startOf('day').toDate();
            endOfDay = dayjs.utc(date).endOf('day').toDate();
        }

        // Fetch events occurring within the day
        const events = await prisma.event.findMany({
            where: {
                startDateTime: { gte: startOfDay },
                endDateTime: { lte: endOfDay }
            }
        });
        return NextResponse.json(events);

    } catch (error) {
        console.error('Failed to fetch events by date:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve events' },
            { status: 500 }
        );
    }
}
