import PostComponent from "@/app/components/posting/Post"
import AddComment from "../../components/commenting/AddComment"
import CommentComponent from "../../components/commenting/Comment"
import { getPost } from "@/app/lib/CRUD-ops/postCRUD"
import { getComments } from "@/app/lib/CRUD-ops/commentCRUD"

export default async function PostPage({ params: { userId, postId } }: Params) {
    const res1 = getPost(postId)
    const res2 = getComments(postId)

    const [post, comments] = await Promise.all([res1, res2])

    return (
        <div>
            <div>
                <PostComponent userId={userId} post={post} />
            </div>
            <div>
                {comments.length > 0 ?
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
