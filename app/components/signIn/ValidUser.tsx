'use client'
import { auth } from '@/app/config/firebase-config'
import { useAuth } from '@/app/lib/stateManagement/authState'
import { onAuthStateChanged } from 'firebase/auth'
// import dynamic from 'next/dynamic'
import { useEffect } from 'react'

// Testing for chunkLoad
import NotSignedIn from './NotSignedIn'

export default function ValidUser({ children, userId }: { 
    children: React.ReactNode, 
    userId: string
 }) {
    const { signedIn } = useAuth()
    
    // const NotSignedIn = dynamic(() => 
    //     import('./NotSignedIn')
    // )

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && user.uid === userId) useAuth.setState({signedIn: true})
            else useAuth.setState({signedIn: false})
        })
    }, [])

    if (!signedIn) return <NotSignedIn />

    return (
        <>
            {children}
        </>
    )
}

