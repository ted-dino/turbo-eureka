import SlidersWrapper from "@/components/custom-ui/Common/Wrapper";
import FeaturedMovie from "@/components/custom-ui/Movies/FeaturedMovie";
import MovieDialog from "@/components/custom-ui/Movies/MovieDialog";
import SeriesDialog from "@/components/custom-ui/TVSeries/SeriesDialog";
import { homeEndpoints } from "@/data/endpoints";

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Home({ searchParams }: Props) {
  const selectedShow = searchParams && searchParams.selectedShow;

  return (
    <main className="relative">
      <FeaturedMovie />
      <SlidersWrapper page="home" options={homeEndpoints} />
      {selectedShow && selectedShow.includes("bW92aWVz") && <MovieDialog />}
      {selectedShow && selectedShow.includes("dHYgc2VyaWVz") && (
        <SeriesDialog />
      )}
    </main>
  );
}
