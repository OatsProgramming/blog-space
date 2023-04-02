'use client'

import { getPostContext } from "@/app/components/posting/PostProvider"
import PostComponent from "@/app/components/posting/Post"

export default function Home({ params: { userId } }: Params) {
  const { subscribedPosts } = getPostContext()

  return (
    <div>
      <div className="flexContainer">
        {subscribedPosts.map(post => (
          <PostComponent key={post.id} userId={userId} post={post} />
        ))}
      </div>
    </div>
  )
}