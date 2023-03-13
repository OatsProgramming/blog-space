'use client'

import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { auth, googleProvider } from "./(config)/firebase-config"

type userInfo =  {
    email: string,
    password: string,
}


export default function Auth(){
    const [createAccount, setCreateAccount] = useState(false)
    const [createInfo, setCreateInfo] = useState<userInfo>({} as userInfo)
    const [signInInfo, setSignInInfo] = useState<userInfo>({} as userInfo)
    const [signedIn, setSignedIn] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (signedIn) router.push(`/${auth.currentUser?.email}`)
        else router.push('/')
    }, [signedIn])

    async function registerAccount(){
        await createUserWithEmailAndPassword(auth, createInfo.email, createInfo.password)
        setSignedIn(true)
        setCreateAccount(false)
    }

    async function signIn(){
        await signInWithEmailAndPassword(auth, signInInfo.email, signInInfo.password)
        setSignedIn(true)
    }

    async function signInPop(provider: GoogleAuthProvider){
        await signInWithPopup(auth, provider)
        setSignedIn(true)
    }

    async function logOut(){
        await signOut(auth)
        setSignedIn(false)
    }


    return (
        <>
            {createAccount ? (
                <div>
                    <input type='email' placeholder="email" onChange={(e) => setCreateInfo({...createInfo, email: e.target.value})}/>
                    <input type='password' placeholder="password" onChange={(e) => setCreateInfo({...createInfo, password: e.target.value})}/>
                    <button onClick={registerAccount}>Register Account</button>
                    <button onClick={() => setCreateAccount(false)}>Cancel</button>
                </div>
            ) : (
                
                <div>
                    {signedIn ? (
                            <button onClick={logOut}>Sign out</button>
                        ) : (
                            <div>
                                <div>
                                    <input type='email' placeholder="email" onChange={(e) => setSignInInfo({...signInInfo, email: e.target.value})}/>
                                    <input type='password' placeholder="password" onChange={(e) => setSignInInfo({...signInInfo, password: e.target.value})}/>
                                    <button onClick={signIn}>Sign In</button>
                                </div>
                                <button onClick={() => setCreateAccount(true)}>Create An Account</button>
                                <button onClick={() => signInPop(googleProvider)}>Sign In With Google</button>
                            </div>
                        )}
                </div>
            )}
        </>
)}