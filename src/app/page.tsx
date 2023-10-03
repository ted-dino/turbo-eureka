import SlidersWrapper from "@/components/custom-ui/Item/Wrapper";
import FeaturedMovie from "@/components/custom-ui/Movies/FeaturedMovie";
import MovieDialog from "@/components/custom-ui/Movies/MovieDialog";
import SeriesDialog from "@/components/custom-ui/SeriesDialog";

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Home({ searchParams }: Props) {
  const selectedShow = searchParams && searchParams.selectedShow;
  const homeEndpoints = [
    {
      title: "Popular Movies",
      params: "/movie/popular",
      type: "movie",
    },
    {
      title: "Top Rated Movies",
      params: "/movie/top_rated",
      type: "movie",
    },
    {
      title: "Popular Series",
      params: "/tv/popular",
      type: "series",
    },
    {
      title: "Top Rated Series",
      params: "/tv/top_rated",
      type: "series",
    },
  ];

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
