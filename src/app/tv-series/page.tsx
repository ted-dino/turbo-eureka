import SeriesDialog from "@/components/custom-ui/TVSeries/SeriesDialog";
import FeaturedSeries from "@/components/custom-ui/TVSeries/FeaturedSeries";
import type { Metadata } from "next";
import SlidersWrapper from "@/components/custom-ui/Common/Wrapper";
import { seriesEndpoints } from "@/data/endpoints";

export const metadata: Metadata = {
  title: "TedFlix - TV Series",
};

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Series({ searchParams }: Props) {
  const modal = searchParams && searchParams.selectedShow;

  return (
    <main>
      <FeaturedSeries />
      <SlidersWrapper page="series" options={seriesEndpoints.slice(0, 5)} />
      {modal !== undefined && <SeriesDialog />}
    </main>
  );
}
