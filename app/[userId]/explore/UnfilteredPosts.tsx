'use client'

import { getPostContext } from "@/app/lib/components/PostProvider";
import PostComponent from "@/app/lib/components/userId/Post";
import Link from "next/link";

export default function UnfilteredPosts({userId} : {userId: string}){
    const { sortedPosts } = getPostContext()

    return (
        <>
            {sortedPosts.map(post => (
                <Link href={`/${userId}/${post.id}`}>
                    <PostComponent key={post.id} post={post}/>
                </Link>
            ))}
        </>
    )
}