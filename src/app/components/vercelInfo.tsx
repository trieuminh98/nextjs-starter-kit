'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const VercelInfo = () => {
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
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        <li className="mb-2 tracking-[-.01em]">
          Get started by editing{' '}
          <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
            src/app/page.tsx
          </code>
          .
        </li>
        <li className="tracking-[-.01em]">Save and see your changes instantly.</li>
      </ol>

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

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <a
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
          Deploy now
        </a>
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read our docs
        </a>
      </div>
    </div>
  );
};

export default VercelInfo;
