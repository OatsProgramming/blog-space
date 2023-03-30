'use client'

import { useRouter } from "next/navigation";

export default function RefreshPage({ children, userId }: {
    children: React.ReactNode,
    userId: string
}) {
    const router = useRouter()

    return (
        <>
            <button onClick={router.refresh}>Refresh</button>  
            {children}
        </>
    )
}