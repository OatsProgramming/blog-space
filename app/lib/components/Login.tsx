'use client'

import React from 'react'
import { useAuth } from '../authState'
import { motion } from 'framer-motion'

export default function Login() {

  const { signIn, signInPop } = useAuth()

  return (
    <>
      <motion.div className='signInPage60' layout='preserve-aspect' layoutId='inputSwitch'>
        <h1>Sign into Your Account</h1>
        <p>Sign in using social networks</p>
        <div className='logo' onClick={signInPop}> 
          {/* Google logo */}
          <svg onClick={signInPop} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
          </svg>
        </div>
        
        or with your email
        <form className='signInPageForm'>
          <input required className="formInput" type='email' placeholder="email" onChange={(e) => useAuth.setState((state) => ({signInInfo: {...state.signInInfo, email: e.target.value} }))}/>
          <label htmlFor='email' className='formLabelEmail'>Email</label>
          <input required className='formInput' type='password' placeholder="password" onChange={(e) => useAuth.setState((state) => ({signInInfo: {...state.signInInfo, password: e.target.value}}))}/>
          <label htmlFor="password" className="formLabelPassword">Password</label>
          <button onClick={(e) => {
            e.preventDefault()
            signIn()
          }}>Sign In</button>
        </form>
      </motion.div>
    </>
  )
}
