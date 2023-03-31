'use client'

import { useAuth } from '../../lib/stateManagement/authState'
// import { motion } from 'framer-motion'

export default function WelcomeBack() {
  return (
    <div className='signInPage40'>
      <h1>Welcome Back!</h1>
      <p>Already have a BlogSpace? Sign in here!</p>
      <button
        onClick={() => useAuth.setState(() => ({ createAccount: false }))}
      >
        SIGN IN
      </button>
    </div>
  )
}
