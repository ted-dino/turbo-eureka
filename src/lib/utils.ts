import { type ClassValue, clsx } from "clsx";
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
