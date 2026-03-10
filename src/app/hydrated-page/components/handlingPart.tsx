'use client';
import React, { useState } from 'react';
import { AppError } from '@/lib/error/app-error';

const HandlingPart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldError, setShouldError] = useState(false);
  const [errorType, setErrorType] = useState<string>('');

  const handleSimulateError = async () => {
    setIsLoading(true);

    // Simulate different types of errors
    const errorTypes = ['network', 'json-parse', 'undefined-property', 'api-error', 'timeout'];

    const randomType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    setErrorType(randomType);
    setShouldError(true);
    setIsLoading(false);
  };

  const handleSimulateFetchError = async () => {
    setIsLoading(true);

    // Simulate realistic API error scenarios
    const scenarios = ['network-error', 'invalid-json', '404-error', '500-error', 'timeout-error'];

    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    setErrorType(randomScenario);
    setShouldError(true);
    setIsLoading(false);
  };

  // Trigger errors based on type
  if (shouldError) {
    switch (errorType) {
      case 'network':
        throw new AppError({
          code: 'NETWORK_ERROR',
          message: 'Failed to fetch user data: Network error',
        });

      case 'json-parse': {
        try {
          JSON.parse('{"name": "John", "age": 30,}'); // Invalid JSON
        } catch (cause) {
          throw new AppError({
            code: 'UNKNOWN_ERROR',
            message: 'Invalid JSON format in local parsing flow',
            cause,
          });
        }
        break;
      }

      case 'undefined-property': {
        const userData: { name: string; email?: string } = { name: 'John' };
        try {
          console.log(userData.email!.toUpperCase()); // userData.email is undefined
        } catch (cause) {
          throw new AppError({
            code: 'UNKNOWN_ERROR',
            message: 'Client runtime error: accessed undefined property',
            cause,
          });
        }
        break;
      }

      case 'api-error':
        throw new AppError({
          code: 'HTTP_ERROR',
          status: 500,
          message: 'HTTP 500: Internal Server Error',
        });

      case 'timeout':
        throw new AppError({
          code: 'TIMEOUT_ERROR',
          message: 'Request timeout after 5 seconds',
        });

      case 'network-error':
        throw new AppError({
          code: 'NETWORK_ERROR',
          message: 'Network error: Failed to connect to server',
        });

      case 'invalid-json': {
        try {
          JSON.parse('invalid json response from API');
        } catch (cause) {
          throw new AppError({
            code: 'UNKNOWN_ERROR',
            message: 'API returned invalid JSON',
            cause,
          });
        }
        break;
      }

      case '404-error':
        throw new AppError({
          code: 'HTTP_ERROR',
          status: 404,
          message: 'HTTP 404: Endpoint not found',
        });

      case '500-error':
        throw new AppError({
          code: 'HTTP_ERROR',
          status: 500,
          message: 'HTTP 500: Internal Server Error',
        });

      case 'timeout-error':
        throw new AppError({
          code: 'TIMEOUT_ERROR',
          message: 'Request timeout: Server took too long to respond',
        });

      default:
        throw new AppError({
          code: 'UNKNOWN_ERROR',
          message: 'Unknown error occurred',
        });
    }
  }

  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      {/* Error Simulation Buttons */}
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            onClick={handleSimulateError}
            disabled={isLoading}
            className="rounded-full border border-solid border-red-500 text-red-500 transition-colors flex items-center justify-center hover:bg-red-500 hover:text-white font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '🔄 Simulating...' : '🧪 Simulate Error'}
          </button>

          <button
            onClick={handleSimulateFetchError}
            disabled={isLoading}
            className="rounded-full border border-solid border-orange-500 text-orange-500 transition-colors flex items-center justify-center hover:bg-orange-500 hover:text-white font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '🔄 Fetching...' : '🌐 Simulate API Error'}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center max-w-xs">
          Click to test error boundary with realistic error scenarios
        </p>
      </div>
    </div>
  );
};

export default HandlingPart;
