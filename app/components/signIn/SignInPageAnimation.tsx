'use client'

import { auth } from "@/app/config/firebase-config"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "../../lib/stateManagement/authState"
import CreateAccount from "./CreateAccount"
import Login from "./Login"
import NewHere from "./NewHere"
import WelcomeBack from "./WelcomeBack"

export default function SignInPageAnimation() {
  const { createAccount, signedIn } = useAuth()

  useEffect(() => {
    if (signedIn && auth.currentUser) {
      redirect(`/${auth.currentUser.uid}/home`)
    }
  }, [signedIn])

  return (
    <>
      {createAccount && (
        <div className='signInPage'>
          <WelcomeBack />     {/* .signInPage40 */}
          <CreateAccount />   {/* .signInPage60 */}
        </div>
      )}
      {!createAccount && (
        <div className="signInPage">
          <Login />           {/* .signInPage60 */}
          <NewHere />         {/* .signInPage40 */}
        </div>
      )}
    </>
  )
}
