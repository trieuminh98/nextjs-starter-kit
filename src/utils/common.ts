import { redirect } from "next/navigation";

// Check if running on client
export const isClient = () => typeof window !== "undefined";

export const isomorphicRedirect = (url: string) => {
  if (isClient()) {
    window.location.href = url;
  } else {
    redirect(url);
  }
};
