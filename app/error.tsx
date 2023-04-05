'use client'; // Error components must be Client components

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Gears from './components/errors/Gears';
import { auth } from './config/firebase-config';
import { useAuth } from './lib/stateManagement/authState';
import styles from './components/css/error.module.css'

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

  function handleClick() {
    if (auth.currentUser) {
      logOut()
    }
    router.push('/')
  }

  return (
    <>
      <Gears />
      <div className={styles['main']}>
        <div className={styles['message']}>
          <h1>
            Something went wrong...
          </h1>
          <div style={{ opacity: 0.7 }}>
            {error.message}
          </div>
          <div className={styles['btnContainer']}>
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
    </>
  );
}
