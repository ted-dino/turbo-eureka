import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBackdropImg(path: string) {
  const backdrop_path = process.env.NEXT_PUBLIC_BACKDROP_PATH as string;
  if (!path) return "/fallback.webp";

  return backdrop_path + path;
}

export function normalizeURL(url: string) {
  return url
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatDate(
  date: Date,
  dateStyle: "full" | "long" | "medium" | "short" | undefined,
) {
  const formattedDate = new Intl.DateTimeFormat("en-US", { dateStyle });
  return formattedDate.format(new Date(date));
}

export function minsToHrs(minutes: number) {
  if (typeof minutes !== "number" || minutes < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
  } else if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else {
    return `${hours} hour${
      hours !== 1 ? "s" : ""
    } and ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
  }
}

export const updateParams = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  isLogin?: string,
) => {
  const queryParams = [];

  searchParams.forEach((value, key) => {
    if (!(isLogin && key === "showLogin")) {
      queryParams.push(`${key}=${value}`);
    }
  });

  if (isLogin) {
    queryParams.push("showLogin=true");
  }

  const queryString = queryParams.join("&");

  return `${pathname}?${queryString}`;
};

export const returnToRoute = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
) => {
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  current.delete("showLogin");
  const search = current.toString();
  return `${pathname}?${search}`;
};
