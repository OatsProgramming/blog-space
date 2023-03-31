'use client'

import { mutateSubscribeList } from "@/app/lib/CRUD-ops/subscribeCRUD"
import { url } from "@/app/lib/tempURL"
import { useEffect, useState } from "react"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function FollowBtn({ userId, otherUserId }: {
    userId: string,
    otherUserId: string,
}) {
    const { data: subscribedTo, error, mutate } = useSWR(`${url}/api/subscriptions?userId=${userId}`, fetcher)
    const [isFollowing, setIsFollowing] = useState(false)
    
    let content = (
        <button onClick={handleClick}>
            {isFollowing ? 'Unfollow' : 'follow'}
        </button>
    )
    
    useEffect(() => {
        if (!subscribedTo) {
            content = (<div>Loading...</div>)
        } else if (error) {
            throw new Error('Failed to fetch subscription list')
        } else if (subscribedTo.includes(otherUserId)) {
            console.log(isFollowing)
            setIsFollowing(true)
        } else {
            console.log(isFollowing)
            setIsFollowing(false)
        }
    }, [subscribedTo])


    function handleClick() {
        let PATCHMethod: UserReqObj['PATCHMethod'] = isFollowing ? 'delete' : 'add'
        console.log(PATCHMethod)
        mutateSubscribeList(
            {
                id: userId,
                otherUserId,
                PATCHMethod
            }
        )
        mutate(subscribedTo!.filter((id: string) => id !== otherUserId))
    }

    return (
        <>
            {content}
        </>
    )
}