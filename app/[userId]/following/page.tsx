import { url } from "@/app/lib/tempURL";
import SubscribedPosts from "./SubscribedPosts";

async function getData(){
  const res = await fetch(`${url}/api/allPosts`)
  if (!res.ok){
    const err = await res.json() as Error
    throw new Error(err.message, {cause: err.cause})
  }
  return res.json()
}

export default async function Following() {
  const posts = await getData()

  return (
    <div>
      <SubscribedPosts posts={posts}/>
    </div>

  )
}
