'use client'
import { auth } from '@/app/config/firebase-config'
import { useAuth } from '@/app/lib/stateManagement/authState'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'

export default function ValidUser({ children, userId }: { 
    children: React.ReactNode, 
    userId: string
 }) {

    const { signedIn } = useAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && auth.currentUser?.uid === userId) useAuth.setState({signedIn: true})
            else useAuth.setState({signedIn: false})
        })
    }, [])

    if (!signedIn) return (
        <div>Not signed in</div>
    )

    return (
        <>
            {children}
        </>
    )
}

