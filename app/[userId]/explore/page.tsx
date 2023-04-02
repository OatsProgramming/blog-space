'use client'

import Slider from "@/app/components/posting/Slider"
import StaticModal from "@/app/components/modal/StaticModal"
import { getPostContext } from "@/app/components/posting/PostProvider"

export default function Explore({ params: { userId } }: Params) {
  const { explorePosts } = getPostContext()

  return (
    <div>
      <StaticModal posts={explorePosts} />
      <Slider posts={explorePosts} userId={userId} />
    </div>
  )
}