import NLink from 'next/link';
import type { ComponentProps } from 'react';

type CustomLinkProps = {
  href?: string;
  external?: boolean;
  className?: string;
  ref?: React.Ref<HTMLAnchorElement>;
} & ComponentProps<typeof NLink>;

const Link = ({
  children,
  href,
  external = false,
  className = '',
  ref,
  ...props
}: CustomLinkProps) => {
  const baseClasses =
    'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors';

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NLink ref={ref} href={href} className={`${baseClasses} ${className}`} {...props}>
      {children}
    </NLink>
  );
};

export default Link;
export type { CustomLinkProps };
