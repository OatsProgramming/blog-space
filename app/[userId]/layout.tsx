import Link from "next/link";
import ValidUser from "../lib/components/home/ValidUser";
import { url } from "../lib/tempURL";
import PostProvider from "../lib/components/PostProvider";
import { Suspense } from "react";

export async function generateMetadata({params : {userId}} : Params){
    // Temporary: fetch the proper data when possible
    return ({
       title:  userId
    })
}

// Having issues with caching; set to 'no-store' for now
async function getData(userId: string){
  const res = await fetch(`${url}/api/allPosts?userId=${userId}`, {
    cache: 'no-store'
  })
  if (!res.ok){
    const err = await res.json() as Error
    throw new Error(err.message, {cause: err.cause})
  }
  return res.json()
}

export default async function NaviBar({
    children,
    params : { userId }
  }: {
    children: React.ReactNode,
    params: {
        userId: string
    }
  }) {
    
    const posts = await getData(userId)

    return (
        <>
            <Link href={`/${userId}/main`}>Main</Link>
            <Link href={`/${userId}/following`}>Following</Link>
            <Link href={`/${userId}/explore`}>Explore</Link>
            <Suspense fallback={<div>Loading...</div>}>
              <PostProvider posts={posts}>
                {children}
              </PostProvider>
            </Suspense>
            <ValidUser userId={userId} />
        </>
    );
  }
