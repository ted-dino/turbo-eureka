import SeriesDialog from "@/components/custom-ui/TVSeries/SeriesDialog";
import FeaturedSeries from "@/components/custom-ui/TVSeries/FeaturedSeries";
import type { Metadata } from "next";
import SlidersWrapper from "@/components/custom-ui/Common/Wrapper";

export const metadata: Metadata = {
  title: "TedFlix - TV Series",
};

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Series({ searchParams }: Props) {
  const modal = searchParams && searchParams.selectedShow;
  const seriesEndpoints = [
    {
      title: "Action & Adventure",
      params: "10759",
    },
    {
      title: "Animation",
      params: "16",
    },
    {
      title: "Comedy",
      params: "35",
    },
    {
      title: "Crime",
      params: "80",
    },
    {
      title: "Drama",
      params: "18",
    },
    {
      title: "Sci-Fi & Fantasy",
      params: "10765",
    },
    {
      title: "War & Politics",
      params: "10768",
    },
  ];
  return (
    <main>
      <FeaturedSeries />
      <SlidersWrapper page="series" options={seriesEndpoints} />
      {modal !== undefined && <SeriesDialog />}
    </main>
  );
}
