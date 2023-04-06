import dynamic from "next/dynamic"
import styles from '@/app/components/css/post.module.css'

export default function PostComponent({ post, userId, inComment } : {
    post: PostObj,
    userId: string,
    inComment?: boolean,
}) {
    const FollowBtn = dynamic(() => 
        import("./FollowBtn")
    )

    const EditPost = dynamic(() =>
        import("./EditPost")
    )

    return (
        <EditPost post={post} currentUser={post.userId === userId}>
            {!inComment ? (
                <div className={styles['postCard']}>
                    <h1>{`${post.title.slice(0, 50) } ...`}</h1>
                    <p>{`${post.body.slice(0, 50) }...`}</p>
                    <i>{post.userEmail}</i><br />
                    <i>{new Date(post.dateMS).toLocaleDateString()}</i>
                </div>
            ) : (
                <>
                    {post.userId !== userId && (
                        <FollowBtn userId={userId} otherUserId={post.userId} />
                    )}
                    <div className={styles['reg']}>
                        <h1>{post.title}</h1>
                        <p style={{ whiteSpace: 'pre-wrap' }}>
                            {post.body}   
                        </p>
                        <i>{post.userEmail}</i><br />
                        <i>{new Date(post.dateMS).toLocaleDateString()}</i>
                    </div>
                </>
            )}
        </EditPost>
    )
}