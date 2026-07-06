import GenreCards from "@/components/GenreCards";
import Jumbotron from "@/components/Jumbotron";
import Loader from "@/components/Loader";
import { Metadata } from "next";
import { Suspense } from "react";
import FeatureCards from "../components/FeatureCards";
import TrendingStaffPicksList from "../components/TrendingStaffPicksList";
import { WEB_BASE_URL } from "../utilities/constants";

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
      <Suspense fallback={<Loader />}>
        <TrendingStaffPicksList />
      </Suspense>
      <FeatureCards />
    </main>
  );
}
