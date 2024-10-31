import { Event } from "@/models/calendar.types"

interface Props {
    event: Event
}
const SmallEventCard: React.FC<Props> = ({ event }) => {
    return (
        <div className=" flex bg-yellow-300 rounded-md overflow-hidden">
            <div className="emphasize w-[5px] bg-blue-800"></div>
            <div className="flex w-full px-2 py-1">
                <div className="info">
                    <h2 className=" text-blue-800 font-semibold text-sm line-clamp-1 break-all leading-4">{event.title}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default SmallEventCard