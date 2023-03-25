'use client'

import PostComponent from "@/app/lib/components/userId/Post"
import { getPostContext } from "../../lib/components/PostProvider"
import Link from "next/link"

export default function SubscribedPosts({userId}: {userId: string}){
    const { filteredPost } = getPostContext()
    return (
        <>
            {filteredPost.map(post => (
                <Link href={`/${userId}/${post.id}`}>
                    <PostComponent key={post.id} post={post}/>
                </Link>
            ))}
        </>
    )
}
