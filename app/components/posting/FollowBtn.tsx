'use client'

import { mutateSubscribeList } from "@/app/lib/CRUD-ops/subscribeCRUD"
import { url } from "@/app/lib/tempURL"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function FollowBtn({ children, userId, otherUserId }: {
    children: React.ReactNode,
    userId: string,
    otherUserId: string,
}) {
    const { data: subscribedTo, error } = useSWR(`${url}/api/subscriptions?userId=${userId}`, fetcher)
    const [isFollowing, setIsFollowing] = useState(false)
    const router = useRouter()
    console.log(subscribedTo)

    useEffect(() => {
        if (subscribedTo.includes(otherUserId)) setIsFollowing(true)
        else setIsFollowing(false)
    }, [subscribedTo])

    console.log(isFollowing)

    function handleClick() {
        let PATCHMethod: UserReqObj['PATCHMethod'] = isFollowing ? 'delete' : 'add'
        console.log(PATCHMethod)
        mutateSubscribeList(
            'PATCH',
            {
                id: userId,
                otherUserId,
                PATCHMethod
            }
        )
        router.refresh()
    }

    return (
        <>
            <button onClick={handleClick}>
                {isFollowing ? 'Unfollow' : 'follow'}
            </button>
            {children}
        </>
    )
}