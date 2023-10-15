import SeriesPlayer from "@/components/custom-ui/TVSeries/SeriesPlayer";
import SimilarList from "@/components/custom-ui/Common/SimilarList";
import { Series, Similar } from "@/types";
import { Metadata } from "next";
import AuthContainer from "@/components/custom-ui/Common/AuthContainer";

type Props = {
  params: { id: number };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const TMBD_URL = process.env.NEXT_PUBLIC_TMDB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN as string;
  const { id } = params;

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

  const series: Series = await res.json();
  return {
    title: `Now Playing - ${series.name}`,
    description: series.overview,
  };
}

async function getData(id: number) {
  const TMBD_URL = process.env.NEXT_PUBLIC_TMDB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN as string;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const res = await fetch(`${TMBD_URL}/tv/${id}/similar`, options);

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}

export default async function Watch({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: Record<string, string>;
}) {
  const { id } = params;
  const similar: Similar = await getData(id);
  return (
    <main className="pt-16">
      <SeriesPlayer series_id={id} />
      <SimilarList similar={similar} route="tv-series" />
      <AuthContainer searchParams={searchParams} />
    </main>
  );
}
