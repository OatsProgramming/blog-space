import AddComment from "@/app/components/commenting/AddComment"
import { getComments } from "@/app/lib/CRUD-ops/commentCRUD"
import quickSortByTime from "@/app/lib/quickSort"
import { lazy, Suspense } from "react"
import useSWR from "swr"

// Testing for chunkLoad
// import CommentComponent from "@/app/components/commenting/Comment"
// import EditComment from "@/app/components/commenting/EditComment"
// import LoadingCircle from "../loading/LoadingCircle"
const LoadingCircle = lazy(() => import('../loading/LoadingCircle'))
const EditComment = lazy(() => import("@/app/components/commenting/EditComment"))
const CommentComponent = lazy(() => import("@/app/components/commenting/Comment"))

export default function CommentsSection({ postId }: {
    postId: string
}) {
    const { data: comments, error, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?postId=${postId}`, getComments)

    let commentsSection: JSX.Element;
    if (isLoading) {
        commentsSection = (
            <Suspense fallback={<></>}>
                <LoadingCircle />
            </Suspense>
        )
    }
    else if (error) {
        commentsSection = <div>Unable to load comment section</div>
    } else {
        const commentsSorted = quickSortByTime(comments!) as CommentObj[]
        commentsSection = (
            <div>
                <AddComment postId={postId} mutate={mutate} comments={comments!} />
                <br />
                <br />
                {commentsSorted.length > 0 ?
                    commentsSorted.map(comment => (
                        <Suspense fallback={<></>}>
                            <EditComment key={comment.id} comment={comment} mutate={mutate} comments={comments!}>
                                <CommentComponent comment={comment} />
                            </EditComment>
                        </Suspense>
                    )) : (
                        <i>Be the first one to comment!</i>
                    )}
            </div>
        )
    }

    return (
        <>
            {commentsSection}
        </>
    )
}