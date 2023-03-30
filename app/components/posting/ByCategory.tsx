import PostComponent from "@/app/components/posting/Post"
import { getUserPosts, getAllPosts } from "@/app/lib/CRUD-ops/postCRUD"
import { getSubscribedList } from "@/app/lib/CRUD-ops/subscribeCRUD"
import { organizeData } from "@/app/lib/organizeData"
import quickSortByTime from "@/app/lib/quickSort"


export default async function PostsByCategory({ category, userId }: {
    category: 'explore' | 'home' | 'user',
    userId: string
}) {
    
    const postsPromise = getAllPosts(userId)
    const subscribedToPromise = getSubscribedList(userId)
    const userPostsPromise = getUserPosts(userId)

    const [posts, subscribedTo, userPosts] = await Promise.all([postsPromise, subscribedToPromise, userPostsPromise])

    const { subscribedPosts, explorePosts } = organizeData(posts, subscribedTo)
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

