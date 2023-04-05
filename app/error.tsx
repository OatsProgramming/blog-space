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
    <div style={{
      // border: '1px solid red',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        // border: '1px solid blue',
        padding: '2rem',
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
      }}>
        <h1>Something went wrong:</h1>
        <div>{error.message}</div>
        <div style={{
          // border: '1px solid green',
          display: 'flex',
          gap: '1rem',
        }}>
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
      </div>
    </div>
  );
}
