'use client'

import { useEffect } from "react"
import { auth } from "../config/firebase-config"

export default function UserPage({params: {userId}} : Params) {

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
    </div>
  )
}
