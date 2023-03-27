'use client'

import PostComponent from "@/app/lib/components/userId/Post"
import { getPostContext } from "../PostProvider"


export default function ShowPosts({ category, userId }: {
    category: 'explore' | 'home',
    userId: string
}) {
    let posts: PostObj[];
    switch (category) {
        case 'explore': {
            const { filteredPost } = getPostContext()
            posts = filteredPost
            break;
        }
        case 'home': {
            const { sortedPosts } = getPostContext()
            posts = sortedPosts
            break;
        }
        default: {
            throw new Error('Unknown category')
        }
    }
    return (
        <>
            {posts.map(post => (
                <PostComponent key={post.id} post={post} userId={userId} />
            ))}
        </>
    )
}
