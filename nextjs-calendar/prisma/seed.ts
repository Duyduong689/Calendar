import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: [
      // Existing events
      {
        title: "Team Meeting",
        description: "Monthly team update meeting",
        eventType: "meeting",
        startDateTime: new Date("2024-11-10T10:00:00Z"),
        endDateTime: new Date("2024-11-10T11:00:00Z"),
        location: "Main Office - Room 202",
        isAllDay: false,
        themeColor: "#4287f5",
      },
      {
        title: "Product Launch Webinar",
        description: "Introduction to the new product line",
        eventType: "webinar",
        startDateTime: new Date("2024-11-15T14:00:00Z"),
        endDateTime: new Date("2024-11-15T15:30:00Z"),
        location: "Online",
        isAllDay: false,
        themeColor: "#f54242",
      },
      {
        title: "Office Celebration",
        eventType: "general",
        startDateTime: new Date("2024-12-25T00:00:00Z"),
        endDateTime: new Date("2024-12-25T23:59:59Z"),
        location: "Office",
        isAllDay: true,
        themeColor: "#42f554",
      },
      {
        title: "Weekly Sync",
        description: "Weekly project synchronization meeting",
        eventType: "meeting",
        startDateTime: new Date("2024-11-13T09:00:00Z"),
        endDateTime: new Date("2024-11-13T10:00:00Z"),
        location: "Conference Room A",
        isAllDay: false,
        themeColor: "#4287f5",
      },

      // New events for October
      {
        title: "Project Kickoff",
        description: "Kickoff meeting for the new project",
        eventType: "meeting",
        startDateTime: new Date("2024-10-01T10:00:00Z"),
        endDateTime: new Date("2024-10-01T11:00:00Z"),
        location: "Main Office - Room 101",
        isAllDay: false,
        themeColor: "#ff6347",
      },
      {
        title: "Marketing Strategy Session",
        description: "Discussion on marketing strategies for Q4",
        eventType: "meeting",
        startDateTime: new Date("2024-10-05T14:00:00Z"),
        endDateTime: new Date("2024-10-05T15:00:00Z"),
        location: "Zoom",
        isAllDay: false,
        themeColor: "#ffa500",
      },
      {
        title: "Monthly All-Hands",
        description: "Company-wide meeting to discuss updates",
        eventType: "meeting",
        startDateTime: new Date("2024-10-10T16:00:00Z"),
        endDateTime: new Date("2024-10-10T17:00:00Z"),
        location: "Auditorium",
        isAllDay: false,
        themeColor: "#4682b4",
      },
      {
        title: "Client Check-In",
        description: "Quarterly check-in with key clients",
        eventType: "meeting",
        startDateTime: new Date("2024-10-12T09:00:00Z"),
        endDateTime: new Date("2024-10-12T10:30:00Z"),
        location: "Main Office - Conference Room B",
        isAllDay: false,
        themeColor: "#32cd32",
      },
      {
        title: "Webinar: Future Trends",
        description: "Exploring future trends in the industry",
        eventType: "webinar",
        startDateTime: new Date("2024-10-15T13:00:00Z"),
        endDateTime: new Date("2024-10-15T14:30:00Z"),
        location: "Online",
        isAllDay: false,
        themeColor: "#8a2be2",
      },
      {
        title: "Team Building Activity",
        description: "Fun day out for team bonding",
        eventType: "general",
        startDateTime: new Date("2024-10-20T08:00:00Z"),
        endDateTime: new Date("2024-10-20T17:00:00Z"),
        location: "Local Park",
        isAllDay: true,
        themeColor: "#ff69b4",
      },
      {
        title: "Halloween Party",
        description: "Celebrate Halloween with costumes and fun",
        eventType: "general",
        startDateTime: new Date("2024-10-31T18:00:00Z"),
        endDateTime: new Date("2024-10-31T23:59:00Z"),
        location: "Office Rooftop",
        isAllDay: false,
        themeColor: "#ffa07a",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
