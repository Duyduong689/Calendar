import { Event } from "@/models/calendar.types"
import { getDateTimeWithGMT } from "@/utils"
import dayjs from "dayjs"
import Link from "next/link"
import { FaCircleUser } from "react-icons/fa6"
import { IoVideocamOutline } from "react-icons/io5"
interface Props {
  event: Event
}
const LargeEventCard: React.FC<Props> = ({ event }) => {

  return (
    <div className={`flex ${event.themeColor == "yellow" ? "bg-yellow-300" : event.themeColor === "orange" ? "bg-orange-300" : "bg-blue-300"} rounded-md overflow-hidden`}>
      <div className={`emphasize w-[10px] ${event.themeColor != "blue" ? "bg-blue-800" : "bg-yellow-800"} `}></div>
      <div className="flex w-full gap-2 justify-between px-3 py-4">
        <div className="info flex gap-2 flex-col">
          <h2 className=" text-blue-800 font-semibold text-base line-clamp-2">{event.title}
          </h2>
          <div className="flex items-center font-semibold gap-1 text-gray-600">
            <span>{dayjs(event.startDateTime).format("hh:mm A")}</span>
            {" — "}
            <span>{dayjs(event.endDateTime).format("hh:mm A")}</span>
            <span>{getDateTimeWithGMT(event.startDateTime).gmtOffsetString}</span>
          </div>
          {event.eventType === "appointment"
            &&
            <div className=" flex items-center gap-2">
              <FaCircleUser className="text-xl" />
              <Link href={"/"} className=" underline text-blue-500">View Client Profile</Link>
            </div>
          }
        </div>
        {event.eventType === "appointment"
          &&
          <div className="icon w-[40px] h-[40px] rounded-full bg-blue-800 text-white flex items-center justify-center p-2">
            <IoVideocamOutline className="text-2xl" />
          </div>
        }
      </div>
    </div>
  )
}

export default LargeEventCard