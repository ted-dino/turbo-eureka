"use client";

import { getList } from "@/queryFns/slider";
import { getMoviesByGenre } from "@/queryFns/movie";
import { getSeriesByGenre } from "@/queryFns/series";
import Slider from "./Slider";

interface Props {
  options: { title: string; params: string }[];
  page: string;
}
export default function Wrapper({ options, page }: Props) {
  return (
    <div className="grid grid-cols-1 gap-y-16">
      {page === "home" &&
        options.map((option, index) => (
          <Slider
            key={index}
            title={option.title}
            queryFn={() => getList(`${option.params}`)}
          />
        ))}
      {page === "movies" &&
        options.map((option, index) => (
          <Slider
            key={index}
            title={option.title}
            queryFn={() => getMoviesByGenre(`${option.params}`)}
          />
        ))}
      {page === "series" &&
        options.map((option, index) => (
          <Slider
            key={index}
            title={option.title}
            queryFn={() => getSeriesByGenre(`${option.params}`)}
          />
        ))}
    </div>
  );
}
