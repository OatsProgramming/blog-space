import { useAuth } from '../../lib/stateManagement/authState'
import { LazyMotion, m } from "framer-motion"
import styles from '@/app/components/css/signIn.module.css'

export default function WelcomeBack() {
  const loadFeatures = () => import('../../lib/animation/domMax').then((mod) => mod.default)

  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div className={styles['pg40']} layout='preserve-aspect' layoutId='switch'>
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
