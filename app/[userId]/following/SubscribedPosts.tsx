'use client'

import { getPostContext } from "../../lib/components/PostProvider"

export default function SubscribedPosts(){
    const { filteredPost } = getPostContext()

    return (
        <>
            <div>Following</div>
            {}
        </>
    )
}

function FilteredPost(){
    return
}