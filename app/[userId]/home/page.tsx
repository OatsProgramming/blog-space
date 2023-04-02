'use client'

import { getPostContext } from "@/app/components/posting/PostProvider"
import Slider from "@/app/components/posting/Slider"

export default function Home({ params: { userId } }: Params) {
  const { subscribedPosts } = getPostContext()

  return (
    <div>
      <Slider posts={subscribedPosts} userId={userId} />
    </div>
  )
}