import { clsx, type ClassValue } from "clsx"
// thư viện giúp nối class thông minh 
import { twMerge } from "tailwind-merge"
// xử lý xung đột class tailwind 

export function cn(...inputs: ClassValue[]) {
  // cn(): máy trộng className cho tailwind 
  //...: bỏ hết vào một cái tú 
  // spread: đổ hết đồ trong túi ra 
  return twMerge(clsx(inputs))
}
