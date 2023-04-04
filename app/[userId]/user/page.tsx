'use client'

import PostComponent from "@/app/components/posting/Post";
import { getPostContext } from "@/app/components/posting/PostProvider";
import dynamic from "next/dynamic";

export default function UserPage({ params: { userId } }: Params) {
  const { userPosts } = getPostContext()

  const LogOut = dynamic(() => 
    import("./LogOut")
  )

  return (
    <div>
        <div className="flexContainer">
          {userPosts.map(post => (
            <PostComponent key={post.id} userId={userId} post={post}/>
          ))}
        </div>
      {/* Temporary */}
      <LogOut />
    </div>
  )
}
