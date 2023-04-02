'use client'

import { getPostContext } from "@/app/components/posting/PostProvider"
import Slider from "../../components/posting/Slider"

export default function Explore({ params: { userId } }: Params) {
  const { explorePosts } = getPostContext()

  return (
    <div>
      <Slider posts={explorePosts} userId={userId} />
    </div>
  )
}