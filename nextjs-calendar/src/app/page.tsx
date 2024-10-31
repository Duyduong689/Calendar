
import LargeCalendar from "@/components/LargeCalendar/LargeCalendar";
import SmallCalendar from "@/components/SmallCalendar/SmallCalendar";

export default function Home() {
  return (
    <div className="container flex mx-auto my-2.5 gap-4">
      <aside id="small-calendar" className="flex-[3]">
        <SmallCalendar />
      </aside>
      <aside id="large-calendar" className="flex-[7]">
        <LargeCalendar />
      </aside>
    </div>
  );
}
