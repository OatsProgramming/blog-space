import Link from "next/link"
import EditPost from "./EditPost"
import FollowBtn from "./FollowBtn"

export default function PostComponent({ post, userId, inComment } : {
    post: PostObj,
    userId: string,
    inComment?: boolean
}) {

    return (
        <EditPost post={post} currentUser={post.userId === userId}>
            {!inComment ? (
                <Link href={`/${userId}/${post.id}`}>
                    <div>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        <i>Created By: {post.userEmail}</i><br />
                        <i>Created At: {post.dateMS}</i>
                    </div>
                </Link>
            ) : (
                <FollowBtn userId={userId} otherUserId={post.userId}>
                    <div>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        <i>Created By: {post.userEmail}</i><br />
                        <i>Created At: {post.dateMS}</i>
                    </div>
                </FollowBtn>
            )}
        </EditPost>
    )
}