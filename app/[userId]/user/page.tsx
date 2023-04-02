'use client'

import PostComponent from "@/app/components/posting/Post";
import { getPostContext } from "@/app/components/posting/PostProvider";
// import PostsByCategory from "@/app/components/posting/ByCategory";
import dynamic from "next/dynamic";

export default function UserPage({ params: { userId } }: Params) {
  // const postsElement = await PostsByCategory({ category: 'user', userId })
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
      {/* {postsElement} */}
      {/* Temporary */}
      <LogOut />
    </div>
  )
}
