export default function PostComponent({post} : {post: PostObj}){
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <i>Created By: {post.userEmail}</i><br />
            <i>Created At: {post.dateMS}</i>
        </div>
    )
}