'use client';
import React, { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useQueryClient } from '@tanstack/react-query';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

interface ComponentWrapperProps extends PropsWithChildren {
  enableErrorBoundary?: boolean;
  errorFallback?: React.ComponentType<FallbackProps>;
  enableSuspense?: boolean;
}

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
            {_error?.message || 'Unknown error'}
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

const ComponentWrapper = ({ children }: PropsWithChildren) => {
  return (
    <section
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '500px',
      }}
    >
      {children}
    </section>
  );
};

const SuspenseWrapper = ({
  children,
  enableSuspense,
}: PropsWithChildren<Pick<ComponentWrapperProps, 'enableSuspense'>>) => {
  if (enableSuspense) {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
  }
  return children;
};

const ErrorBoundaryWrapper = ({
  children,
  enableErrorBoundary,
  errorFallback,
}: PropsWithChildren<Pick<ComponentWrapperProps, 'enableErrorBoundary' | 'errorFallback'>>) => {
  if (enableErrorBoundary) {
    return (
      <ErrorBoundary
        FallbackComponent={errorFallback || ErrorFallback}
        onError={(error, errorInfo) => {
          // Log error to console or external service
          console.error('Error caught by boundary:', error, errorInfo);
        }}
      >
        {children}
      </ErrorBoundary>
    );
  }
  return children;
};

const ContainerWrapper = ({
  children,
  enableErrorBoundary = true,
  errorFallback,
  enableSuspense = true,
}: ComponentWrapperProps) => {
  return (
    <ErrorBoundaryWrapper enableErrorBoundary={enableErrorBoundary} errorFallback={errorFallback}>
      <SuspenseWrapper enableSuspense={enableSuspense}>
        <ComponentWrapper>{children}</ComponentWrapper>
      </SuspenseWrapper>
    </ErrorBoundaryWrapper>
  );
};

export default ContainerWrapper;
