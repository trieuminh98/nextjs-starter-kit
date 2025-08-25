'use client';
import React, { PropsWithChildren } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

interface ComponentWrapperProps extends PropsWithChildren {
  enableErrorBoundary?: boolean;
  errorFallback?: React.ComponentType<FallbackProps>;
  // Future options can be added here
  // enableSuspense?: boolean;
  // enableStrictMode?: boolean;
  // enableProfiler?: boolean;
}

const ErrorFallback = ({ error: _error, resetErrorBoundary }: ErrorFallbackProps) => {
  console.log(_error);
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

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={resetErrorBoundary}
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

const Component = ({ children }: PropsWithChildren) => {
  return (
    <section
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '200px',
      }}
    >
      {children}
    </section>
  );
};

const componentWrapper = ({
  children,
  enableErrorBoundary = true,
  errorFallback,
  // enableSuspense = false,
  // enableStrictMode = false,
  // enableProfiler = false,
}: ComponentWrapperProps) => {
  // If ErrorBoundary is disabled, return children directly
  if (enableErrorBoundary) {
    return (
      <ErrorBoundary
        FallbackComponent={errorFallback || ErrorFallback}
        onError={(error, errorInfo) => {
          // Log error to console or external service
          console.error('Error caught by boundary:', error, errorInfo);
        }}
      >
        <Component>{children}</Component>
      </ErrorBoundary>
    );
  }

  return <Component>{children}</Component>;
};

export default componentWrapper;
