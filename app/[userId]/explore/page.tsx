'use client'

import Slider from "@/app/components/posting/Slider"
import { getPostContext } from "@/app/components/posting/PostProvider"

export default function Explore({ params: { userId } }: Params) {
  const { explorePosts } = getPostContext()

  return (
    <div>
      <Slider posts={explorePosts} userId={userId} />
    </div>
  )
}