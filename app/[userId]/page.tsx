'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { auth } from "../config/firebase-config"
import { useAuth } from "../lib/authState"

export default function UserPage({params: {userId}} : Params) {

  const { logOut } = useAuth()
  const router = useRouter()

  function handleLogOut(){
    logOut()
    router.push('/')
  }

  useEffect(() => {
    if (!auth.currentUser){
      throw new Error('Not signed in')
    } else if (auth.currentUser.uid !== userId){
      throw new Error('Invalid user')
    }
  }, [])

  return (
    <div>
        {userId}
        <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}
