'use client'

import PostComponent from "@/app/components/posting/Post";
import { getPostContext } from "@/app/components/posting/PostProvider";
import { useAuth } from "@/app/lib/stateManagement/authState";
import { useRouter } from "next/navigation";

export default function UserPage({ params: { userId } }: Params) {
  const { userPosts } = getPostContext()
  const { logOut } = useAuth()
  const router = useRouter()

  function handleLogOut() {
    logOut()
    router.push('/')
  }

  // const LogOut = dynamic(() => 
  //   import("./LogOut")
  // )

  return (
    <div>
        <div className="flexContainer">
          {userPosts.map(post => (
            <PostComponent key={post.id} userId={userId} post={post}/>
          ))}
        </div>
      <div>
        <button onClick={handleLogOut}>Log out</button>
      </div>
    </div>
  )
}
