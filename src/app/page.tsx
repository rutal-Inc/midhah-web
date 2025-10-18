import GenreCards from "@/src/components/GenreCards";
import Jumbotron from "@/src/components/Jumbotron";
import { Metadata } from "next";
import FeatureCards from "../components/FeatureCards";
import TrendingStaffPicksList from "../components/TrendingStaffPicksList";
import { WEB_BASE_URL } from "../utilities/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: `${WEB_BASE_URL}`,
  },
};

export default function Home() {
  return (
    <main>
      <Jumbotron />
      <GenreCards />
      <TrendingStaffPicksList />
      <FeatureCards />
    </main>
  );
}
