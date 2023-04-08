'use client'

import React from 'react'
import { useAuth } from '../../lib/stateManagement/authState'
import { LazyMotion, m } from "framer-motion"
import 'react-toastify/dist/ReactToastify.css';
// import dynamic from 'next/dynamic';
import styles from '@/app/components/css/signIn.module.css'
import 'react-toastify/dist/ReactToastify.css'

// Testing for chunkLoad
import { ToastContainer } from 'react-toastify';

export default function Login() {

  // const ToastContainer = dynamic(() =>
  //   import('../../lib/toast/ToastContainer').then((mod) => mod.default)
  // ) as React.ForwardRefExoticComponent<any>

  // Lazy load animation
  const loadFeatures = () => import('../../lib/animation/domMax').then((mod) => mod.default)

  const { signIn, signInPop } = useAuth()
  const notify = async (message: string) => {
    const toast = await import('../../lib/toast/toastNotification').then((mod) => mod.default)
    return toast.error(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  async function popUpHandler() {
    const result = await signInPop()
    if (result instanceof Error) notify(result.message)
  }

  async function signInHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const result = await signIn()
    if (result instanceof Error) notify(result.message)
  }

  return (
    <LazyMotion features={loadFeatures}>
      <m.div className={styles['pg60']} layout='preserve-aspect' layoutId='inputSwitch'>
        <h1>Sign into Your Account</h1>
        <p>Sign in using social networks</p>
        <div className='logo'>
          {/* Google logo */}
          <svg onClick={popUpHandler} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
        </div>

        or with your email
        <form className={styles['form']}>
          <div className={styles['textField']}>
            <input type="email" id="email" name='email' placeholder=" "
              onChange={(e) => useAuth.setState((state) => ({ signInInfo: { ...state.signInInfo, email: e.target.value } }))}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles['textField']}>
            <input type="password" id="password" name='password' placeholder=" "
              onChange={(e) => useAuth.setState((state) => ({ signInInfo: { ...state.signInInfo, password: e.target.value } }))}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button onClick={signInHandler}>Sign In</button>
        </form>
      </m.div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </LazyMotion>
  )
}

