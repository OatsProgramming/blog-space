'use client'

import Empty from "@/app/components/Empty";
import PostComponent from "@/app/components/posting/Post";
import { getPostContext } from "@/app/components/posting/PostProvider";
import quickSortByTime from "@/app/lib/quickSort";
import { useAuth } from "@/app/lib/stateManagement/authState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function UserPage({ params: { userId } }: Params) {
  const { userPosts } = getPostContext()
  const sortedPosts = useMemo(() => (
    quickSortByTime(userPosts) as PostObj[]
  ), [userPosts])

  const { logOut } = useAuth()
  const router = useRouter()

  function handleLogOut() {
    logOut()
    router.push('/')
  }

  useEffect(() => {
    router.refresh()
  }, [])

  // const LogOut = dynamic(() => 
  //   import("./LogOut")
  // )

  return (
    <div >
      {userPosts.length > 0 ? (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          padding: '2rem',
          // border: '1px solid red',
        }}>
          {sortedPosts.map(post => (
            <Link href={`/${userId}/user/${post.id}`}>
              <PostComponent key={post.id} userId={userId} post={post} />
            </Link>
          ))}
        </div>
      ) : (
          <Empty inUserPage />
      )}
      <div>
        <button onClick={handleLogOut}>Log out</button>
      </div>
    </div>
  )
}
