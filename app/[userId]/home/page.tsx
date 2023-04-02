'use client'

import Slider from "@/app/components/posting/Slider"
import StaticModal from "@/app/components/modal/StaticModal"
import { getPostContext } from "@/app/components/posting/PostProvider"

export default function Home({ params: { userId } }: Params) {
  const { subscribedPosts } = getPostContext()

  return (
    <div>
      <StaticModal posts={subscribedPosts} />
      <Slider posts={subscribedPosts} userId={userId} />
    </div>
  )
}