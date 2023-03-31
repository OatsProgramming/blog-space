import PostsByCategory from "@/app/components/posting/ByCategory";
import LogOut from "./LogOut";


export default async function UserPage({ params: { userId } }: Params) {
  const postsElement = await PostsByCategory({ category: 'user', userId })
  return (
    <div>
      <div></div>
      {postsElement}
      {/* Temporary */}
      <LogOut />
    </div>
  )
}
