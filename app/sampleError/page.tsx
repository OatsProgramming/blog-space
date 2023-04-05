'use client'; // Error components must be Client components

import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
import styles from '../components/css/error.module.css'
import Gears from '../components/errors/Gears';
import { useAuth } from '../lib/stateManagement/authState';
import { auth } from '../config/firebase-config';

export default function Error() {
  // useEffect(() => {
  //   console.error(error);
  // }, [error]);

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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni pariatur tempore, nostrum, cum tenetur vel doloribus sunt deserunt praesentium ipsa voluptatibus dolorum modi beatae, eligendi mollitia delectus sapiente consequuntur quo!
          </div>
          <div className={styles['btnContainer']}>
            <button
              onClick={ router.refresh }
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
