import PostComponent from "@/app/components/posting/Post"
import { getUserPosts, getAllPosts } from "@/app/lib/CRUD-ops/postCRUD"
import { organizeData } from "@/app/lib/organizeData"
import quickSortByTime from "@/app/lib/quickSort"
import { url } from "@/app/lib/tempURL"

async function getUserInfo(userId: string): Promise<UserObj> {
    const res = await fetch(`${url}/api/users?userId=${userId}`, {
        cache: 'no-store'
    })
    if (!res.ok) {
        const err = await res.json() as Error
        throw new Error(err.message, { cause: err.cause })
    }
    return res.json()
}

export default async function PostsByCategory({ category, userId }: {
    category: 'explore' | 'home' | 'user',
    userId: string
}) {
    
    const postsPromise = getAllPosts(userId)
    const userPromise = getUserInfo(userId)
    const userPostsPromise = getUserPosts(userId)

    const [posts, user, userPosts] = await Promise.all([postsPromise, userPromise, userPostsPromise])

    const { subscribedPosts, explorePosts } = organizeData(posts, user.subscribedTo)
    const userPostsSorted = quickSortByTime(userPosts) as PostObj[]

    switch (category) {
        case 'explore': {
            return (
                <>
                    {explorePosts.map(post => (
                        <PostComponent key={post.id} post={post} userId={userId} />
                    ))}
                </>
            )
        }
        case 'home': {
            return (
                <>
                    {subscribedPosts.map(post => (
                        <PostComponent key={post.id} post={post} userId={userId} />
                    ))}
                </>
            )
        }
        case 'user': {
            return (
                <>
                    {userPostsSorted.map(post => (
                        <PostComponent key={post.id} post={post} userId={userId} />
                    ))}
                </>
            )
        }
        default: {
            throw new Error('Unknown category: error occured in "PostsCategory" JSX Element')
        }
    }
}

