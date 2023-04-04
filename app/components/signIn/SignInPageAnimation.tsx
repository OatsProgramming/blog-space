'use client'

import { auth } from "@/app/config/firebase-config"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "../../lib/stateManagement/authState"
import CreateAccount from "./CreateAccount"
import Login from "./Login"
import NewHere from "./NewHere"
import WelcomeBack from "./WelcomeBack"
import styles from '@/app/components/css/signIn.module.css'

export default function SignInPageAnimation() {
  const { createAccount, signedIn } = useAuth()

  useEffect(() => {
    if (signedIn && auth.currentUser) {
      redirect(`/${auth.currentUser.uid}/home`)
    }
  }, [signedIn])

  return (
    <div className={styles['pg']}>
      {createAccount && (
        <>
          <WelcomeBack />     {/* .pg40 */}
          <CreateAccount />   {/* .pg60 */}
        </>
      )}
      {!createAccount && (
        <>
          <Login />           {/* .pg60 */}
          <NewHere />         {/* .pg40 */}
        </>
      )}
    </div>
  )
}
