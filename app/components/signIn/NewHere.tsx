'use client'

import { useAuth } from "../../lib/stateManagement/authState"
// import { motion } from 'framer-motion'
import { LazyMotion, m } from "framer-motion"

export default function NewHere() {

  // Lazy load animation
  const loadFeatures = () => import('../../lib/animation/features').then((mod) => mod.domMax)

  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div className='signInPage40' layout='preserve-aspect' layoutId='switch'>
        <h1>New here?</h1>
        <p>Sign up and have a space to blog in BlogSpace!</p>
        <button onClick={() => useAuth.setState(() => ({
          createAccount: true
        }))}>
          SIGN UP
        </button>
      </m.div>
    </LazyMotion>
  )
}