import { NextResponse } from 'next/server';
import prisma from '@/utils/connect'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

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
