import SeriesDialog from "@/components/custom-ui/TVSeries/SeriesDialog";
import FeaturedSeries from "@/components/custom-ui/TVSeries/FeaturedSeries";
import type { Metadata } from "next";
import SlidersWrapper from "@/components/custom-ui/Common/Wrapper";
import { seriesEndpoints } from "@/data/endpoints";
import { Movie } from "@/types";

type Propss = {
  searchParams: Record<string, string> | null | undefined;
};
export async function generateMetadata({
  searchParams,
}: Propss): Promise<Metadata> {
  const TMBD_URL = process.env.NEXT_PUBLIC_TMDB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN as string;
  const modal = searchParams && searchParams.selectedShow;
  const id = modal?.replace(/dHYgc2VyaWVz|bW92aWVz/g, "") || "";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const res = await fetch(
    `${TMBD_URL}/tv/${id}?language=en-US&page=1`,
    options,
  );
  const movie: Movie = await res.json();
  return {
    title: `TedFlix - ${
      searchParams && searchParams.selectedShow ? `${movie.name}` : "Series"
    }`,
    description: movie.overview,
  };
}
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
