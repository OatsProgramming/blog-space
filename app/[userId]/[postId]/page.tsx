import PostComponent from "@/app/lib/components/userId/Post"
import { url } from "../../lib/tempURL"
import AddComment from "./AddComment"
import CommentComponent from "./Comment"

// Having issues with caching; set to 'no-store' for now
async function getPost(postId: string){
    const res = await fetch(`${url}/api/posts?postId=${postId}`, {
        cache: 'no-store'
    })
    if (!res.ok) {
        const err = await res.json() as Error
        throw new Error(err.message, {cause: err.cause})
    }
    return res.json()
}

// Having issues with caching; set to 'no-store' for now
async function getComments(postId: string){
    const res = await fetch (`${url}/api/comments?postId=${postId}`, {
        cache: 'no-store'
    })
    if (!res.ok) {
        const err = await res.json() as Error
        console.log(err)
        throw new Error(err.message, {cause: err.cause})
    }
    return res.json()
}

export default async function PostPage({params: {userId, postId}}: Params) {
    // console.log(postId)
    const res1 = getPost(postId)
    const res2 = getComments(postId)

    const [post, comments]: [PostObj, CommentObj[]] = await Promise.all([res1, res2])

  return (
    <div>
        <div>
            <PostComponent post={post} />
        </div>
        <div>
            {comments.length > 1 ? 
            comments.map(comment => (
                <CommentComponent key={comment.id} comment={comment} userId={userId} />
            )) : (
                <i>Be the first one to comment!</i>
            )}
              <AddComment postId={postId} />
        </div>
    </div>
  )
}
