'use client'
import { auth } from '@/app/config/firebase-config'
import { useEffect } from 'react'

export default function ValidUser({userId} : {userId: string}) {
    useEffect(() => {
        if (!auth.currentUser) {
            throw new Error('Not signed in')
        } else if (auth.currentUser.uid !== userId) {
            throw new Error('Invalid user')
        }
    }, [])
  return <></>
}
