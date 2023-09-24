import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBackdropImg(path:string) {
  const backdrop_path = process.env.NEXT_PUBLIC_BACKDROP_PATH as string;
  if(!path) return "/fallback.webp"

  return backdrop_path + path
}
