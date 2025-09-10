'use client';
import React, { useState } from 'react';

const HandlingPart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldError, setShouldError] = useState(false);
  const [errorType, setErrorType] = useState<string>('');
  console.log('render');

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
        throw new Error('Failed to fetch user data: Network error');

      case 'json-parse':
        JSON.parse('{"name": "John", "age": 30,}'); // Invalid JSON
        break;

      case 'undefined-property':
        const userData: { name: string; email?: string } = { name: 'John' };
        console.log(userData.email!.toUpperCase()); // userData.email is undefined
        break;

      case 'api-error':
        throw new Error('HTTP 500: Internal Server Error');

      case 'timeout':
        throw new Error('Request timeout after 5 seconds');

      case 'network-error':
        throw new Error('Network error: Failed to connect to server');

      case 'invalid-json':
        JSON.parse('invalid json response from API');
        break;

      case '404-error':
        throw new Error('HTTP 404: Endpoint not found');

      case '500-error':
        throw new Error('HTTP 500: Internal Server Error');

      case 'timeout-error':
        throw new Error('Request timeout: Server took too long to respond');

      default:
        throw new Error('Unknown error occurred');
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
