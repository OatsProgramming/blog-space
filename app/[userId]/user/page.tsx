import PostsByCategory from "@/app/components/posting/ByCategory";
import dynamic from "next/dynamic";

export default async function UserPage({ params: { userId } }: Params) {
  const postsElement = await PostsByCategory({ category: 'user', userId })
  const LogOut = dynamic(() => 
    import("./LogOut")
  )

  return (
    <div>
      <div></div>
      {postsElement}
      {/* Temporary */}
      <LogOut />
    </div>
  )
}
