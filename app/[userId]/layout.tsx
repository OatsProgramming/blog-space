import Link from "next/link";
import ValidUser from "../components/signIn/ValidUser";
import { url } from "../lib/tempURL";
import AddPost from "../components/posting/AddPost";
import { PostProvider } from "../components/posting/PostProvider";
import { getAllPosts, getUserPosts } from "../lib/CRUD-ops/postCRUD";
import { getSubscribedList } from "../lib/CRUD-ops/subscribeCRUD";
import styles from '@/app/components/css/nav.module.css'
import BgImg from "../components/BgImg";
import RefreshPage from "../components/RefreshPage";
import { notFound } from "next/navigation";

export async function generateMetadata({ params: { userId } }: Params) {
  const res = await fetch(`${url}/api/users?userId=${userId}`)
  if (!res.ok && res.status === 404) notFound()
  
  const user = await res.json() as UserObj
  return ({
    title: `${user.userEmail}'s Page`,
    description: `Insert something here`
  })
}

export default async function Layout({
  children,
  params: { userId }
}: {
  children: React.ReactNode,
  params: {
    userId: string
  }
  }) {

  const allPostsPromise = getAllPosts(userId)
  const subscribedToPromise = getSubscribedList(userId)
  const userPostsPromise = getUserPosts(userId)
  const [allPosts, subscribedTo, userPosts] = await Promise.all([allPostsPromise, subscribedToPromise, userPostsPromise])

  return (
    <>
      <ValidUser userId={userId}>
        <BgImg />
        <nav className={styles['nav']}>
          <Link href={`/${userId}/explore`} className={styles['item']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
              <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
              <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
            </svg>
          </Link>
          <Link href={`/${userId}/home`} className={styles['item']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
            </svg>
          </Link>
          <AddPost />
          <Link href={`/${userId}/user`} className={styles['item']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          </Link>
          <RefreshPage />
        </nav>
        <PostProvider allPosts={allPosts} subscribedTo={subscribedTo} userPosts={userPosts}>
          {children}
        </PostProvider>
      </ValidUser>
    </>
  );
}
