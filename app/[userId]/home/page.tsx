'use client'

import Slider from "@/app/components/posting/Slider"
import { getPostContext } from "@/app/components/posting/PostProvider"

export default function Home({ params: { userId } }: Params) {
  const { subscribedPosts } = getPostContext()

  return (
    <div>
      <Slider posts={subscribedPosts} userId={userId} />
    </div>
  )
}