import SlidersWrapper from "@/components/custom-ui/Item/Wrapper";
import FeaturedMovie from "@/components/custom-ui/Movies/FeaturedMovie";
import MovieDialog from "@/components/custom-ui/Movies/MovieDialog";

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Movies({ searchParams }: Props) {
  const modal = searchParams && searchParams.selectedShow;
  const moviesEndpoints = [
    {
      title: "Action",
      params: "28",
      type: "movie",
    },
    {
      title: "Comedy",
      params: "35",
      type: "movie",
    },
    {
      title: "Documentary",
      params: "99",
      type: "movie",
    },
    {
      title: "Family",
      params: "10751",
      type: "movie",
    },
    {
      title: "History",
      params: "36",
      type: "movie",
    },
    {
      title: "Horror",
      params: "27",
      type: "movie",
    },
    {
      title: "Science Fiction",
      params: "878",
      type: "movie",
    },
    {
      title: "War",
      params: "10752",
      type: "movie",
    },
    {
      title: "Western",
      params: "37",
      type: "movie",
    },
  ];
  return (
    <main>
      <FeaturedMovie />
      <SlidersWrapper page="movies" options={moviesEndpoints} />
      {modal !== undefined && <MovieDialog />}
    </main>
  );
}
