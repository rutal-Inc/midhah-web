import LyricsRailSection from "./LyricsRailSection";

export default async function TrendingStaffPicksList() {
  return (
    <div className="overflow-hidden bg-slate-100 md:grid md:grid-cols-2 md:gap-8 md:px-17.5">
      <LyricsRailSection
        title="Trending"
        type="trending"
        size={5}
        href="/trending"
      />
      <LyricsRailSection
        title="Staff Picks"
        type="staff-picks"
        size={5}
        href="/staff-picks"
      />
    </div>
  );
}
