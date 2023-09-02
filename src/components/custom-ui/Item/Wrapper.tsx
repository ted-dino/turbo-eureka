"use client";

import { getList } from "@/queryFns/slider";
import Slider from "./Slider";
export default function Wrapper() {
  return (
    <div className="grid grid-cols-1 gap-y-16">
      <Slider title="Popular Movies" queryFn={() => getList("/movie/popular")} />
      <Slider title="Top Rated Movies" queryFn={() => getList("/movie/top_rated")} />
      <Slider title="Popular Series" queryFn={() => getList("/tv/popular")}/>
      <Slider title="Top Rated Series" queryFn={() => getList("/tv/top_rated")}/>
    </div>
  );
}
