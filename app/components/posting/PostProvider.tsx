'use client'

import { organizeData } from "@/app/lib/organizeData"
import quickSortByTime from "@/app/lib/quickSort"
import { createContext, useContext } from "react"

const PostContext = createContext<{
    explorePosts: PostObj[];
    subscribedPosts: PostObj[];
    userPosts: PostObj[]
}>({} as any)

export function PostProvider({
    allPosts,
    subscribedTo,
    userPosts,
    children
}: {
    allPosts: PostObj[],
    subscribedTo: string[],
    userPosts: PostObj[],
    children: React.ReactNode
}) {
    const sortedPosts = quickSortByTime(allPosts) as PostObj[]
    const filteredPosts = organizeData(sortedPosts, subscribedTo)

    return (
        <PostContext.Provider value={{...filteredPosts, userPosts}}>
            {children}
        </PostContext.Provider>
    )
}

export function getPostContext() {
    return useContext(PostContext)
}
