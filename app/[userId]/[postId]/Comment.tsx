export default function CommentComponent({comment} : {comment: CommentObj}){
    return (
        <div>
            <p>{comment.body}</p>
            <i>{comment.userEmail}</i>
            <i>{comment.dateMS}</i>
        </div>
    )
}