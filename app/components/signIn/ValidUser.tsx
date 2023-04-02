'use client'
import { auth } from '@/app/config/firebase-config'
import { useAuth } from '@/app/lib/stateManagement/authState'
import { onAuthStateChanged } from 'firebase/auth'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

export default function ValidUser({ children, userId }: { 
    children: React.ReactNode, 
    userId: string
 }) {

    const { signedIn } = useAuth()
    const Link = dynamic(() => 
        import('next/link').then((mod) => mod.default)
    )
    const RefreshPage = dynamic(() => 
        import('../RefreshPage').then((mod) => mod.default)
    )

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && user.uid === userId) useAuth.setState({signedIn: true})
            else useAuth.setState({signedIn: false})
        })
    }, [])

    if (!signedIn) return (
        <>
            <div>
                <h1>Trying to sign in?</h1>
                <p>
                    Please log in <Link href={'/'}><i>here</i></Link>
                </p>
                <p>
                    Or try refreshing the page
                </p>
                <RefreshPage />
            </div>
        </>
    )

    return (
        <>
            {children}
        </>
    )
}

