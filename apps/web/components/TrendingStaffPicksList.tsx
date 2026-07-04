import Link from "next/link";
import RenderFilteredList from "./RenderFilteredList";

export default async function TrendingStaffPicksList() {
  return (
    <div className="overflow-hidden bg-slate-100 md:grid md:grid-cols-2 md:px-[70px]">
      <div className="container mx-auto py-10 pt-10 md:pt-14">
        <h2 className="mb-1 pl-4 text-2xl md:mb-4 md:text-4xl">Trending</h2>
        <RenderFilteredList size={5} type="trending" columns={1} />
        <div className="mx-auto text-center">
          <Link
            href="/trending"
            className="ring-secondary-light hover:ring-secondary inline-block rounded-sm border px-4 py-2 ring-1 ring-inset hover:ring-2 hover:ring-inset"
          >
            Explore More
          </Link>
        </div>
      </div>
      <div className="container mx-auto py-20 md:pt-14">
        <h2 className="mb-1 pl-4 text-2xl md:mb-4 md:text-4xl">Staff Picks</h2>
        <RenderFilteredList size={5} type="staff-picks" columns={1} />
        <div className="mx-auto text-center">
          <Link
            href="/staff-picks"
            className="ring-secondary-light hover:ring-secondary inline-block rounded-sm border px-4 py-2 ring-1 ring-inset hover:ring-2 hover:ring-inset"
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
}
