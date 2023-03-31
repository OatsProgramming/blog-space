export default function CommentComponent({ comment }: {
    comment: CommentObj
}) {
    return (
        <>
            <div className="commentBody">
                <p>{comment.body}</p>
            </div>
            <div className="commentMeta">
                <i>{comment.userEmail}</i>
                <i>{new Date(comment.dateMS).toLocaleDateString()}</i>
            </div>
        </>
    )
}