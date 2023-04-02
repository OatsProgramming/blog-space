import PostComponent from "@/app/components/posting/Post"
import AddComment from "../../components/commenting/AddComment"
import CommentComponent from "../../components/commenting/Comment"
import { getPost } from "@/app/lib/CRUD-ops/postCRUD"
import { getComments } from "@/app/lib/CRUD-ops/commentCRUD"
import EditComment from "@/app/components/commenting/EditComment"
import quickSortByTime from "@/app/lib/quickSort"
// import { comments } from "@/toyData/commentData"
// import { subPosts } from "@/toyData/postData"

export default async function PostPage({ params: { userId, postId } }: Params) {
    const res1 = getPost(postId)
    const res2 = getComments(postId)

    const [post, comments] = await Promise.all([res1, res2])
    const commentsSorted = quickSortByTime(comments) as CommentObj[]

    return (
        <div>
            <div>
                <PostComponent userId={userId} post={post} inComment/>
            </div>
            <div>
                {commentsSorted.length > 0 ?
                    commentsSorted.map(comment => (
                        <EditComment key={comment.id} comment={comment} >
                            <CommentComponent comment={comment} />
                        </EditComment>
                    )) : (
                        <i>Be the first one to comment!</i>
                    )}
                <AddComment postId={postId} />
            </div>
        </div>
    )
}
