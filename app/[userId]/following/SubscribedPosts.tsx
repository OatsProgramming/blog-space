'use client'

import { getUserData } from "@/app/lib/getUserData"

export default function SubscribedPosts({posts} : {posts: PostObj[]}){
    const { userInfo, filterPosts } = getUserData()
    const subscribedTo = userInfo.subscribedTo
    const subscribedPosts = filterPosts(posts, subscribedTo)
    console.log(subscribedPosts)

    return (
        <>
            {subscribedPosts.map(post => (
                <div key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            ))}
        </>
    )
}