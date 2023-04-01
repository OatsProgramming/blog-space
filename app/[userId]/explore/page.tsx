import PostsByCategory from "@/app/components/posting/ByCategory";

export default async function Explore({ params: { userId } }: Params) {

  const postsElement = await PostsByCategory({ category: 'explore', userId })
  
  return (
    <div>
      {postsElement}
    </div>
  )
}