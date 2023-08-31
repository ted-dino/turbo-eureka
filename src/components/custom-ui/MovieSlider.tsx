"use client";

import { useQuery } from "@tanstack/react-query";
import { getRandomGenre } from "@/queryFns/movie";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "../ui/button";
import MovieCard from "./MovieCard";
import useUIState from "@/lib/uiState";

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

export default function MovieSlider({ sliderKey }: { sliderKey: number }) {
  const backdrop_path = process.env.NEXT_PUBLIC_BACKDROP_PATH;
  const { setShowModal, showModal } = useUIState();
  const { isLoading, data } = useQuery({
    queryKey: [`slider-item-${sliderKey}`],
    queryFn: getRandomGenre,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  const settings = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
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

  const setShowDialog = () => {
    setShowModal(!showModal);
    console.log(showModal)
  };

  return (
    <>
      <h2 className="mb-3 pl-14 text-2xl font-bold md:text-4xl lg:text-6xl">
        {data?.genre}
      </h2>
      <Slider className="my-slider relative bg-transparent" {...settings}>
        {data &&
          data.results.length > 0 &&
          data.results.slice(0, 10).map((item) => (
            <>
              <MovieCard
                key={item.id}
                src={
                  item.backdrop_path
                    ? `${backdrop_path}${item.backdrop_path}`
                    : "/fallback.webp"
                }
                title={item.title}
                handleClick={setShowDialog}
              />
            </>
          ))}
      </Slider>
    </>
  );
}
