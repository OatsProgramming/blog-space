import { url } from "@/app/lib/tempURL"
import Link from "next/link"
import EditPost from "./EditPost"
import FollowBtn from "./FollowBtn"

async function getSubscribedList(userId: string): Promise<string[]> {
    const res = await fetch(`${url}/api/subscriptions?userId=${userId}`)
    if (!res.ok) {
        const err = await res.json()
        console.log(err)
    }
    return res.json()
}

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