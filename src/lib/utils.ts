import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBackdropImg(link:string, path?:string) {
  if(!path) return "/fallback.webp"

  return link + path
}
