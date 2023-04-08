'use client'

import { LazyMotion, m } from "framer-motion"
import { useAuth } from "../../lib/stateManagement/authState"
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from "@/app/lib/CRUD-ops/userCRUD";
import { auth } from "@/app/config/firebase-config";
import styles from '@/app/components/css/signIn.module.css'
import 'react-toastify/dist/ReactToastify.css'
import { lazy, Suspense } from "react";

// import { ToastContainer } from "react-toastify";
const ToastContainer = lazy(() =>
  import('../../lib/toast/ToastContainer')
) 

export default function CreateAccount() {
  const { registerAccount, signInPop, createInfo } = useAuth()

  // Lazy load animation
  const loadFeatures = () => import('../../lib/animation/domMax').then((mod) => mod.default)

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
    if (result instanceof Error) {
      return notify(result.message)
    } else {
      // Only interested if it exists
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?userId=${auth.currentUser?.uid}`)
      if (!res.ok) {
        createUser({
          id: auth.currentUser?.uid!,
          userEmail: auth.currentUser?.email!,
          subscribedTo: []
        })
      }
    }
  }

  async function registerHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const resultOne = await registerAccount()
    if (resultOne instanceof Error) {
      return notify(resultOne.message)
    } else {
      createUser({
        id: auth.currentUser?.uid!,
        userEmail: createInfo.email,
        subscribedTo: []
      })
    }
  }

  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div className={styles['pg60']} layout='preserve-aspect' layoutId='inputSwitch'>
        <h1>Create Account</h1>
        <div>
          {/* Google logo */}
          <svg onClick={popUpHandler} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
        </div>
        <br />
        or use your email for registration:
        <form className={styles['form']}>
          <div className={styles['textField']}>
            <input type="email" id="email" name='password' placeholder=" " required
              onChange={(e) => useAuth.setState((state) => ({ createInfo: { ...state.createInfo, email: e.target.value } }))}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles['textField']}>
            <input type="password" id="password" name='password' placeholder=" " required
              onChange={(e) => useAuth.setState((state) => ({ createInfo: { ...state.createInfo, password: e.target.value } }))}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button onClick={registerHandler}>SIGN UP</button>
        </form>
      </m.div>
      <Suspense fallback={<></>}>
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
      </Suspense>
    </LazyMotion>
  )
}
