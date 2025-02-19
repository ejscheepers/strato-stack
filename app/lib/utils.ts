import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function testServer() {
  console.log(
    "This is a console log to show that the server can use code from the app🎉"
  );
}
