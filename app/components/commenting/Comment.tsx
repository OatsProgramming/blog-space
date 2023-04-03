export default function CommentComponent({ comment }: {
    comment: CommentObj
}) {
    return (
        <>
            <div className="commentBody">
                <p style={{ whiteSpace: 'pre-wrap' }}>
                    {comment.body}
                </p>
            </div>
            <div className="commentMeta">
                <i>{comment.userEmail}</i>
                <i>{new Date(comment.dateMS).toLocaleDateString()}</i>
            </div>
        </>
    )
}