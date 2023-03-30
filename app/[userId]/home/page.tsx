import PostsByCategory from "@/app/components/posting/ByCategory";

export default async function Home({ params: { userId } }: Params) {

  const postsElement = await PostsByCategory({ category: 'home', userId })

  return (
    <div>
      {postsElement}
    </div>
  )
}
