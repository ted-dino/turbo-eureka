"use client";

import FeaturedMovie from "./FeaturedMovie";
import { getRandomMovie } from "@/queryFns/movie";

export default function Wrapper({ endpoint }: { endpoint: string }) {
  return <FeaturedMovie queryFn={() => getRandomMovie(endpoint)} />;
}
