'use client'

import React from 'react'
import { useAuth } from '../../lib/stateManagement/authState'
import { motion } from 'framer-motion'

export default function WelcomeBack() {
  return (
    <motion.div className='signInPage40' layout='preserve-aspect' layoutId='switch'>
      <h1>Welcome Back!</h1>
      <p>Already have a BlogSpace? Sign in here!</p>
      <button
        onClick={() => useAuth.setState(() => ({ createAccount: false }))}
      >
        SIGN IN
      </button>
    </motion.div>
  )
}
