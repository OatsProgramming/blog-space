import { mutateSubscribeList } from "@/app/lib/CRUD-ops/subscribeCRUD"
import { useEffect, useState } from "react"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function FollowBtn({ userId, otherUserId }: {
    userId: string,
    otherUserId: string,
}) {
    const { data: subscribedTo, error, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions?userId=${userId}`, fetcher)
    const [isFollowing, setIsFollowing] = useState(false)
    
    let content = (
        <button onClick={handleClick}>
            {isFollowing ? 'Unfollow' : 'follow'}
        </button>
    )
    
    useEffect(() => {
        if (isLoading) {
            content = (<div>Loading...</div>)
        } else if (error) {
            throw new Error('Failed to fetch subscription list')
        } else if (subscribedTo.includes(otherUserId)) {
            setIsFollowing(true)
        } else {
            setIsFollowing(false)
        }
    }, [subscribedTo])


    async function handleClick() {
        let PATCHMethod: UserReqObj['PATCHMethod'] = isFollowing ? 'delete' : 'add'
        await mutateSubscribeList(
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