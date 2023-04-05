import Link from "next/link";
import ValidUser from "../components/signIn/ValidUser";
import { url } from "../lib/tempURL";
import AddPost from "../components/posting/AddPost";
import { BiUserCircle } from 'react-icons/bi'
import { AiFillHome } from 'react-icons/ai'
import { FaRegCompass } from 'react-icons/fa'

// import { userId } from "@/toyData/userData";
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
            <FaRegCompass className="icon" />
          </Link>
          <Link href={`/${userId}/home`} className={styles['item']}>
            <AiFillHome className="icon" />
          </Link>
          <AddPost />
          <Link href={`/${userId}/user`} className={styles['item']}>
            <BiUserCircle className="icon" />
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
