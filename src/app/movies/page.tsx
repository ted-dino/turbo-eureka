import Wrapper from "@/components/custom-ui/Wrapper";
import SlidersWrapper from "@/components/custom-ui/Item/Wrapper";
import ItemDialog from "@/components/custom-ui/Item/Dialog";

export default function Movies() {
  const moviesEndpoints = [
    {
      title: "Action",
      params: "28",
    },
    {
      title: "Comedy",
      params: "35",
    },
    {
      title: "Documentary",
      params: "99",
    },
    {
      title: "Family",
      params: "10751",
    },
    {
      title: "History",
      params: "36",
    },
    {
      title: "Horror",
      params: "27",
    },
    {
      title: "Science Fiction",
      params: "878",
    },
    {
      title: "War",
      params: "10752",
    },
    {
      title: "Western",
      params: "37",
    },
  ];
  return (
    <main>
      <Wrapper endpoint="/movie/popular" />
      <SlidersWrapper page="movies" options={moviesEndpoints} />
      <ItemDialog />
    </main>
  );
}
