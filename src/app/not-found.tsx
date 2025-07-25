'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-screen items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-bold">Page not found!</h2>
      <button
        className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => router.push('/')
        }
      >
        Back to home page
      </button>
    </div>
  );
}
