'use client'

import { useAuth } from "../../lib/stateManagement/authState"
// import { motion } from 'framer-motion'

export default function NewHere() {
  return (
    <div className='signInPage40' >
      <h1>New here?</h1>
      <p>Sign up and have a space to blog in BlogSpace!</p>
      <button onClick={() => useAuth.setState(() => ({
        createAccount: true
      }))}>
        SIGN UP
      </button>
    </div>
  )
}