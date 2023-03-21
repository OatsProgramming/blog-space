'use client'; // Error components must be Client components

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter()

  return (
    <div>
      <h2>Error: {error.message}</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again?
      </button>
      <button
        onClick={() => router.push('/')}
      >
            Home?
      </button>
    </div>
  );
}
