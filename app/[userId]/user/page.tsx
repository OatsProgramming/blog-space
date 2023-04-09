'use client'

import PostComponent from "@/app/components/posting/Post";
import { getPostContext } from "@/app/components/posting/PostProvider";
import quickSortByTime from "@/app/lib/quickSort";
import { useAuth } from "@/app/lib/stateManagement/authState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Empty from "@/app/components/Empty";
import styles from './editUserPage.module.css'

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

  // Temp
  function handleEdit() {
    router.push(`/${userId}/user/edit`)
  }

  useEffect(() => {
    router.refresh()
  }, [])

  return (
    <div>
      {sortedPosts.length > 0 ? (
        <div className={styles['postsContainer']}>
          {sortedPosts.map(post => (
            <Link href={`/${userId}/user/${post.id}`}>
              <PostComponent key={post.id} userId={userId} post={post} />
            </Link>
          ))}
        </div>
      ) : (
          <Empty inUserPage />
      )}
      <div className={styles['btnContainer']}>
        <button onClick={handleLogOut}>Log out</button>
        <button onClick={handleEdit}>Edit Profile</button>
      </div>
    </div>
  )
}
