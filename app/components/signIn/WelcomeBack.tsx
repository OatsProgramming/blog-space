'use client'

import { useAuth } from '../../lib/stateManagement/authState'
import { LazyMotion, m } from "framer-motion"

export default function WelcomeBack() {

  // Lazy load animation
  const loadFeatures = () => import('../../lib/animation/features').then((mod) => mod.domMax)
   
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div className='signInPage40' layout='preserve-aspect' layoutId='switch'>
        <h1>Welcome Back!</h1>
        <p>Already have a BlogSpace? Sign in here!</p>
        <button
          onClick={() => useAuth.setState(() => ({ createAccount: false }))}
        >
          SIGN IN
        </button>
      </m.div>
    </LazyMotion>
  )
}
