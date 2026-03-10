'use client';
import React, { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@/lib/error/app-error';

type ErrorFallbackProps = {
  error: unknown;
  resetErrorBoundary: () => void;
};

const ErrorFallback = ({ error: _error, resetErrorBoundary }: ErrorFallbackProps) => {
  const queryClient = useQueryClient();

  const handleReset = () => {
    // Auto-clear all failed queries
    queryClient
      .getQueryCache()
      .getAll()
      .forEach((query) => {
        if (query.state.status === 'error') {
          queryClient.removeQueries({ queryKey: query.queryKey });
        }
      });
    // Reset error boundary
    resetErrorBoundary();
  };

  const errorMessage = getErrorMessage(_error, 'Unknown error');

  return (
    <div className="max-w-md w-full rounded-lg p-6 text-center">
      {/* Error Icon */}
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
        <svg
          className="h-6 w-6 text-red-600 dark:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      {/* Error Title */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Something went wrong
      </h2>

      {/* Error Details (for debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <details className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          <summary className="cursor-pointer">Error details</summary>
          <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-left overflow-auto">
            {errorMessage}
          </pre>
        </details>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Try again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Reload page
        </button>
      </div>

      {/* Additional Info */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        If the problem persists, please contact support
      </p>
    </div>
  );
};

const baseWrapperStyle: React.CSSProperties = {
  contentVisibility: 'auto',
  containIntrinsicSize: '500px',
};

type ComponentWrapperProps = PropsWithChildren<{
  className?: string;
}>;

export const ComponentWrapper = ({ children, className }: ComponentWrapperProps) => (
  <section className={`${className ?? ''}`} style={baseWrapperStyle}>
    <div className="min-w-0">{children}</div>
  </section>
);

const DefaultLoadingFallback = () => {
  return <div>Loading...</div>;
};

type SuspenseBoundaryProps = PropsWithChildren<{
  fallback?: React.ReactNode;
}>;

export const SuspenseBoundary = ({
  children,
  fallback = <DefaultLoadingFallback />,
}: SuspenseBoundaryProps) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

const defaultErrorFallback = ErrorFallback;

type ComponentErrorBoundaryProps = PropsWithChildren<{
  fallbackComponent?: React.ComponentType<FallbackProps>;
}>;

export const ErrorBoundary = ({
  children,
  fallbackComponent = defaultErrorFallback,
}: ComponentErrorBoundaryProps) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallbackComponent}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

type CompositeWrapperProps = PropsWithChildren<
  Pick<ComponentErrorBoundaryProps, 'fallbackComponent'> &
    Pick<SuspenseBoundaryProps, 'fallback'> &
    Pick<ComponentWrapperProps, 'className'>
>;

export const CompositeWrapper = ({
  children,
  fallbackComponent,
  fallback,
  className,
}: CompositeWrapperProps) => {
  return (
    <ComponentWrapper className={className}>
      <ErrorBoundary fallbackComponent={fallbackComponent}>
        <SuspenseBoundary fallback={fallback}>{children}</SuspenseBoundary>
      </ErrorBoundary>
    </ComponentWrapper>
  );
};

export default CompositeWrapper;
