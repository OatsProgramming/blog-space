import AddComment from "@/app/components/commenting/AddComment"
import CommentComponent from "@/app/components/commenting/Comment"
import EditComment from "@/app/components/commenting/EditComment"
import { getComments } from "@/app/lib/CRUD-ops/commentCRUD"
import quickSortByTime from "@/app/lib/quickSort"
import { url } from "@/app/lib/tempURL"
import useSWR from "swr"

export default function CommentsSection({ postId }: {
    postId: string
}) {
    const { data: comments, error, isLoading } = useSWR(`${url}/api/comments?postId=${postId}`, getComments) 
    let commentsSection: JSX.Element;
    if (isLoading) {
        commentsSection = <div>Loading...</div>
    }
    else if (error) {
        commentsSection = <div>Unable to load comment section</div>
    } else {
        const commentsSorted = quickSortByTime(comments!) as CommentObj[]
        commentsSection = (
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
        )
    }

    return (
        <>
            {commentsSection}
        </>
    )
}