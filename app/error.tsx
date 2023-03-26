'use client'; // Error components must be Client components

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from './config/firebase-config';
import { useAuth } from './lib/stateManagement/authState';

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
  const { logOut } = useAuth()

  function handleClick(){
    if (auth.currentUser){
      logOut()
    }
    router.push('/')
  }

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
        onClick={handleClick}
      >
            Return to sign in?
      </button>
    </div>
  );
}
