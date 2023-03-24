'use client'

import { Context, createContext, useContext } from "react"
import { getUserData } from "../stateManagement/getUserData"
import { filterPosts } from "../organizeData"

const PostContext: Context<{ sortedPosts: PostObj[]; filteredPost: PostMap; }>  =
    createContext({} as {
        sortedPosts: PostObj[];
        filteredPost: PostMap;
    })

export default function PostProvider({children, posts} : {
    children: React.ReactNode,
    posts: PostObj[]
}){
    const { userInfo } = getUserData()
    const assortedPosts = filterPosts(posts, userInfo.subscribedTo)
    return (
        <PostContext.Provider value={assortedPosts}>
            {children}
        </PostContext.Provider>
    )
}

export function getPostContext(){
    return useContext(PostContext)
}