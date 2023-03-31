'use client'

// import { motion } from "framer-motion"
import { useAuth } from "../../lib/stateManagement/authState"
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser, getUser } from "@/app/lib/CRUD-ops/userCRUD";
import { auth } from "@/app/config/firebase-config";
import { url } from "@/app/lib/tempURL";
import dynamic from "next/dynamic";

export default function CreateAccount() {
  const { registerAccount, signInPop, createInfo } = useAuth()

  const ToastContainer = dynamic(() =>
    import('react-toastify').then((mod) => mod.ToastContainer)
  )

  // @ts-ignore
  const toast = dynamic(() =>
    import('react-toastify').then((mod) => mod.toast)
  ) as any

  const notify = (message: string) => {
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
      const res = await fetch(`${url}/api/users?userId=${auth.currentUser?.uid}`)
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
    <div className='signInPage60'>
      <h1>Create Account</h1>
      <div>
        {/* Google logo */}
        <svg onClick={popUpHandler} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google">
          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
        </svg>
      </div>
      <br />
      or use your email for registration:
      <form className="signInPageForm">
        <input required className="formInput" type='email' placeholder="email" onChange={(e) => useAuth.setState((state) => ({ createInfo: { ...state.createInfo, email: e.target.value } }))} />
        <label htmlFor='email' className='formLabelEmail'>Email</label>
        <input required className='formInput' type='password' placeholder="password" onChange={(e) => useAuth.setState((state) => ({ createInfo: { ...state.createInfo, password: e.target.value } }))} />
        <label htmlFor="password" className="formLabelPassword">Password</label>
        <button onClick={registerHandler}>SIGN UP</button>
      </form>
      <ToastContainer
        // @ts-ignore
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
    </div>
  )
}
