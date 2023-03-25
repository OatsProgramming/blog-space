'use client'
import { auth } from '@/app/config/firebase-config'
import { useEffect } from 'react'
import { getUserData } from '../../stateManagement/getUserData'


// USE AS JSX ELEMENT; DONT CONVERT TO A FUNCTION
// ( will create auth.currentUser && RSC issues!!!  )
// Update: auth.currentUser only works properly on client side, not server
export default function ValidUser({userId} : {userId: string}) {

    const { updateUserInfo, createUserInfo, updateUserPosts } = getUserData()

    useEffect(() => {
        // Issue: when refreshing, auth.currentUser goes null
        // Note to self: 
        // - 'signedIn' as dependency doesnt work
        // - 'auth.currentUser' as dependency would cause errors
        if (!auth.currentUser) {
            throw new Error('Not signed in')
        } else if (auth.currentUser?.uid !== userId) {
            throw new Error('Invalid user')
        } 
        
        (async () => {
            const updateRes = await updateUserInfo(userId)
            // if valid user not in db
            if (updateRes instanceof Error) createUserInfo(userId, auth.currentUser?.email!)
            updateUserPosts(userId)
        })();
        
    }, [])

  return <></>
}
