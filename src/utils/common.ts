import { redirect } from 'next/navigation';
import { isClient } from './runtime';

type RedirectTarget = Parameters<typeof redirect>[0];

export const isomorphicRedirect = (url: RedirectTarget | string) => {
  const href = typeof url === 'string' ? url : `${url}`;
  if (isClient()) {
    window.location.href = href;
  } else {
    redirect(url as RedirectTarget);
  }
};
