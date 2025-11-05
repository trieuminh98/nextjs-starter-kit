import { redirect } from 'next/navigation';

// Check if running on client
export const isClient = () => typeof window !== 'undefined';

type RedirectTarget = Parameters<typeof redirect>[0];

export const isomorphicRedirect = (url: RedirectTarget | string) => {
  const href = typeof url === 'string' ? url : `${url}`;
  if (isClient()) {
    window.location.href = href;
  } else {
    redirect(url as RedirectTarget);
  }
};
