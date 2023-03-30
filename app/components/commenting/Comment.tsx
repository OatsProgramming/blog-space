export default function CommentComponent({ comment }: {
    comment: CommentObj
}) {
    return (
        <>
            <p>{comment.body}</p>
            <i>{comment.userEmail}</i>
            <i>{comment.dateMS}</i>
        </>
    )
}