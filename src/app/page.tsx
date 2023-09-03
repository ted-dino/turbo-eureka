import SlidersWrapper from "@/components/custom-ui/Item/Wrapper";
import ItemDialog from "@/components/custom-ui/Item/Dialog";
import FeatMovieWrapper from "@/components/custom-ui/Wrapper";

export default function Home() {
  const homeEndpoints = [
    {
      title: "Popular Movies",
      params: "/movie/popular",
    },
    {
      title: "Top Rated Movies",
      params: "/movie/top_rated",
    },
    {
      title: "Popular Series",
      params: "/tv/popular",
    },
    {
      title: "Top Rated Series",
      params: "/tv/top_rated",
    },
  ];
  return (
    <main className="relative">
      <FeatMovieWrapper endpoint="/movie/top_rated" />
      <SlidersWrapper page="home" options={homeEndpoints} />
      <ItemDialog />
    </main>
  );
}
