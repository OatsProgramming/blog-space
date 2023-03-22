'use client'

import { useAuth } from '@/app/lib/authState'
import { useRouter } from 'next/navigation'

// Temporary component
export default function LogOut() {
    const { logOut } = useAuth()
    const router = useRouter()

    function handleLogOut() {
        logOut()
        router.push('/')
    }
    return (
        <div>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}
