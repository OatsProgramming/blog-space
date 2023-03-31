import dynamic from "next/dynamic"
// import Link from "next/link"
import EditPost from "./EditPost"
// import FollowBtn from "./FollowBtn"

export default function PostComponent({ post, userId, inComment } : {
    post: PostObj,
    userId: string,
    inComment?: boolean
}) {
    const FollowBtn = dynamic(() => 
        import("./FollowBtn")
    )

    const Link = dynamic(() => 
        import("next/link")
    )

    return (
        <EditPost post={post} currentUser={post.userId === userId}>
            {!inComment ? (
                <Link href={`/${userId}/${post.id}`} className="postCard">
                    <div>
                        <h1>{post.title}</h1>
                        <p>{`${post.body.slice(0, 50) }...`}</p>
                        <i>{post.userEmail}</i><br />
                        <i>{new Date(post.dateMS).toLocaleDateString()}</i>
                    </div>
                </Link>
            ) : (
                <>
                    {post.userId !== userId && (
                        <FollowBtn userId={userId} otherUserId={post.userId} />
                    )}
                    <div className="postCard">
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        <i>{post.userEmail}</i><br />
                        <i>{new Date(post.dateMS).toLocaleDateString()}</i>
                    </div>
                </>
            )}
        </EditPost>
    )
}