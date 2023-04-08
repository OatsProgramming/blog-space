'use client'
import { auth } from '@/app/config/firebase-config'
import { useAuth } from '@/app/lib/stateManagement/authState'
import { onAuthStateChanged } from 'firebase/auth'
import { Suspense, useEffect, lazy } from 'react'

// Testing for chunkLoad
// import NotSignedIn from './NotSignedIn'
const NotSignedIn = lazy(() => 
    import('./NotSignedIn')
)

export default function ValidUser({ children, userId }: { 
    children: React.ReactNode, 
    userId: string
 }) {
    const { signedIn } = useAuth()
    

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && user.uid === userId) useAuth.setState({signedIn: true})
            else useAuth.setState({signedIn: false})
        })
    }, [])

    if (!signedIn) return (
        <Suspense fallback={<></>}>
            <NotSignedIn />
        </Suspense>
    )

    return (
        <>
            {children}
        </>
    )
}

