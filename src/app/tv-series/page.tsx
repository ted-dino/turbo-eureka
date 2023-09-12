import Wrapper from "@/components/custom-ui/Wrapper";
import SlidersWrapper from "@/components/custom-ui/Item/Wrapper";
import SeriesDialog from "@/components/custom-ui/SeriesDialog";

export default function Series() {
  const seriesEndpoints = [
    {
      title: "Action & Adventure",
      params: "10759",
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
      title: "Family",
      params: "10751",
    },
    {
      title: "Mystery",
      params: "9648",
    },
    {
      title: "News",
      params: "10763",
    },
    {
      title: "Reality",
      params: "10764",
    },
    {
      title: "Sci-Fi & Fantasy",
      params: "10765",
    },
    {
      title: "Soap",
      params: "10766",
    },
    {
      title: "Talk",
      params: "10767",
    },
    {
      title: "War & Politics",
      params: "10768",
    },
  ];
  return (
    <main>
      <Wrapper endpoint="/tv/popular" />
      <SlidersWrapper page="series" options={seriesEndpoints} />
      <SeriesDialog />
    </main>
  );
}
