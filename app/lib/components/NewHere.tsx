'use client'

import { useAuth } from "../authState"
import { motion } from 'framer-motion'

export default function NewHere(){
    return (
        <motion.div  className='signInPage40' layout='preserve-aspect' layoutId='switch'>
            <h1>New here?</h1>
            <p>Sign up and have a space to blog in BlogSpace!</p>
            <button onClick={() => useAuth.setState(() => ({
              createAccount: true
            }))}>
              SIGN UP
            </button>
         </motion.div>
    )
}