import { useAuth } from "../../lib/stateManagement/authState"
import { LazyMotion, m } from "framer-motion"
import styles from '@/app/components/css/signIn.module.css'

export default function NewHere() {

  // Lazy load animation
  const loadFeatures = () => import('../../lib/animation/domMax').then((mod) => mod.default)

  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div className={styles['pg40']} layout='preserve-aspect' layoutId='switch'>
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