"use client";

import FeaturedItem from "./FeaturedMovie";
import { getRandomMovie } from "@/queryFns/movie";

export default function Wrapper({ endpoint }: { endpoint: string }) {
  return <FeaturedItem queryFn={() => getRandomMovie(endpoint)} />;
}
