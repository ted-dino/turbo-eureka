"use client";

import { useQuery } from "@tanstack/react-query";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "../../ui/button";
import ItemCard from "./Card";
import { Result } from "@/types";
import { Skeleton } from "../../ui/skeleton";

const PrevArrow = (props: CustomArrowProps) => {
  return (
    <Button
      id="prev-arrow"
      className="bg-gradient-to-r from-[#141414]/30 hover:bg-transparent hover:text-slate-50 absolute h-full top-1/2 -translate-y-1/2 z-50"
      onClick={props.onClick}
      variant="ghost"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </Button>
  );
};

const NextArrow = (props: CustomArrowProps) => {
  return (
    <Button
      id="next-arrow"
      className="bg-gradient-to-l from-[#141414] hover:bg-transparent hover:text-slate-50 absolute h-full top-1/2 -translate-y-1/2 z-50 right-0"
      onClick={props.onClick}
      variant="ghost"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </Button>
  );
};

interface Props {
  queryFn: () => Promise<Result>;
  title: string;
  type?: string;
}

export default function ItemsSlider({ title, type, queryFn }: Props) {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["slider-items", title],
    queryFn: queryFn,
    refetchOnWindowFocus: false,
  });

  const settings = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    draggable: false,
    swipe: false,
    slidesToScroll: 1,
    centerPadding: "60px",
    centerMode: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {isFetching || isLoading ? (
        <>
          <div className="mb-3 pl-14">
            <Skeleton className="h-12 w-32 md:w-40 lg:w-44" />
          </div>
          <div className={`grid gap-x-3 grid-cols-6`}>
            {Array(6)
              .fill("")
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-24 w-32 md:w-40 lg:w-44 rounded"
                />
              ))}
          </div>
        </>
      ) : (
        <div>
          <h2 className="slider-title mb-3 pl-14 text-2xl font-bold md:text-4xl lg:text-5xl cursor-pointer">
            {title}
          </h2>
          <Slider className="my-slider relative bg-transparent" {...settings}>
            {data &&
              data.results.length > 0 &&
              data.results
                .slice(0, 10)
                .map((item) => (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    type={type as string}
                    path={item.backdrop_path}
                    title={item.name ? item.name : item.title}
                  />
                ))}
          </Slider>
        </div>
      )}
    </>
  );
}
