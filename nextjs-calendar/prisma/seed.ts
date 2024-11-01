import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedEvents = async () => {
    const events = [
        {
            title: 'Team Meeting',
            description: 'Monthly team sync-up meeting.',
            eventType: 'event',
            startDateTime: new Date('2024-11-01T10:00:00Z'), // Example DateTime in UTC
            endDateTime: new Date('2024-11-01T11:00:00Z'),
            themeColor: 'yellow',
            recurrenceType: 'none',
        },
        {
            title: 'Project Kickoff',
            description: 'Kickoff meeting for the new project.',
            eventType: 'event',
            startDateTime: new Date('2024-11-05T14:00:00Z'),
            endDateTime: new Date('2024-11-05T15:00:00Z'),
            themeColor: 'blue',
            recurrenceType: 'none',
        },
        {
            title: 'Doctor Appointment',
            description: 'Annual health check-up.',
            eventType: 'appointment',
            startDateTime: new Date('2024-11-10T09:00:00Z'),
            endDateTime: new Date('2024-11-10T09:30:00Z'),
            themeColor: 'orange',
            recurrenceType: 'none',
        },
        {
            title: 'Lunch with Client',
            description: 'Discuss project updates and next steps.',
            eventType: 'appointment',
            startDateTime: new Date('2024-11-15T12:00:00Z'),
            endDateTime: new Date('2024-11-15T13:00:00Z'),
            themeColor: 'yellow',
            recurrenceType: 'none',
        },
        {
            title: 'Weekly Sync',
            description: 'Weekly sync with the marketing team.',
            eventType: 'event',
            startDateTime: new Date('2024-11-20T10:00:00Z'),
            endDateTime: new Date('2024-11-20T11:00:00Z'),
            themeColor: 'blue',
            recurrenceType: 'none',
        },
        {
            title: 'Conference Call',
            description: 'Monthly conference call with stakeholders.',
            eventType: 'event',
            startDateTime: new Date('2024-11-25T15:00:00Z'),
            endDateTime: new Date('2024-11-25T16:00:00Z'),
            themeColor: 'orange',
            recurrenceType: 'none',
        },
        {
            title: 'Team Meeting',
            description: 'Monthly team sync-up meeting.',
            eventType: 'event',
            startDateTime: new Date('2024-10-01T10:00:00Z'), // Example DateTime in UTC
            endDateTime: new Date('2024-10-01T11:00:00Z'),
            themeColor: 'yellow',
            recurrenceType: 'none',
        },
        {
            title: 'Project Kickoff',
            description: 'Kickoff meeting for the new project.',
            eventType: 'event',
            startDateTime: new Date('2024-10-05T14:00:00Z'),
            endDateTime: new Date('2024-10-05T15:00:00Z'),
            themeColor: 'blue',
            recurrenceType: 'none',
        },
        {
            title: 'Doctor Appointment',
            description: 'Annual health check-up.',
            eventType: 'appointment',
            startDateTime: new Date('2024-10-10T09:00:00Z'),
            endDateTime: new Date('2024-10-10T09:30:00Z'),
            themeColor: 'orange',
            recurrenceType: 'none',
        },
        {
            title: 'Lunch with Client',
            description: 'Discuss project updates and next steps.',
            eventType: 'appointment',
            startDateTime: new Date('2024-10-15T12:00:00Z'),
            endDateTime: new Date('2024-10-15T13:00:00Z'),
            themeColor: 'yellow',
            recurrenceType: 'none',
        },
        {
            title: 'Weekly Sync',
            description: 'Weekly sync with the marketing team.',
            eventType: 'event',
            startDateTime: new Date('2024-10-20T10:00:00Z'),
            endDateTime: new Date('2024-10-20T11:00:00Z'),
            themeColor: 'blue',
            recurrenceType: 'none',
        },
        {
            title: 'Conference Call',
            description: 'Monthly conference call with stakeholders.',
            eventType: 'event',
            startDateTime: new Date('2024-10-25T15:00:00Z'),
            endDateTime: new Date('2024-10-25T16:00:00Z'),
            themeColor: 'orange',
            recurrenceType: 'none',
        },
    ];

    // Insert events into the database
    for (const event of events) {
        await prisma.event.create({ data: event });
    }

    console.log('Seed data has been added to the database.');
};

seedEvents()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
