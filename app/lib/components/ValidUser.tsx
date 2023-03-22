'use client'
import { auth } from '@/app/config/firebase-config'
import { useEffect } from 'react'
import { getUserData } from '../getUserData'


// USE AS JSX ELEMENT; DONT CONVERT TO A FUNCTION
// ( will create auth.currentUser && RSC issues!!!  )
// Update: auth.currentUser only works properly on client side, not server
export default function ValidUser({userId, navi} : {userId: string, navi?: Navi}) {

    const { userInfo, userPosts, updateUserInfo, createUserInfo, updateUserPosts } = getUserData()

    useEffect(() => {
        if (!auth.currentUser) {
            throw new Error('Not signed in')
        } else if (auth.currentUser.uid !== userId) {
            throw new Error('Invalid user')
        } 
        
        (async () => {
            const updateRes = await updateUserInfo(userId)
            // if valid user not in db
            if (updateRes instanceof Error) createUserInfo(userId, auth.currentUser?.email!)
            updateUserPosts(userId)
        })();
        
    }, [auth.currentUser])

    // console.log(userInfo)
    // console.log(userPosts)
  return <></>
}

function findNavi(navi: Navi){
    switch(navi){
        case 'explore':{

            break;
        }
        case 'following':{
            break;
        }
        case 'main':{
            break;
        }
    }
}

