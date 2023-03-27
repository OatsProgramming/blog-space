import PostComponent from "@/app/lib/components/userId/Post";
import { url } from "@/app/lib/tempURL";
import LogOut from "./LogOut";

async function getUserPosts(userId: string) {
  const res = await fetch(`${url}/api/posts?userId=${userId}`)
  if (!res.ok){
    const err = await res.json() as Error
    console.log(err)
    throw new Error(err.message, {cause: err.cause})
  }
  return res.json()
}

export default async function UserPage({params: {userId}} : Params) {
  const userPosts: PostObj[] = await getUserPosts(userId)
  
  return (
    <div>
        Main 
        {userPosts.map(post => (
            <PostComponent post={post} userId={userId} />
        ))}
        {/* Temporary */}
        <LogOut />
    </div>
  )
}
