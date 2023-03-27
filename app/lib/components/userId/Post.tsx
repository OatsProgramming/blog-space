import { auth } from "@/app/config/firebase-config"
import Link from "next/link"
import EditPost from "./EditPost"

export default function PostComponent({ post, userId } : {
    post: PostObj,
    userId: string
}) {
    return (
        <EditPost post={post} currentUser={post.userId === userId}>
            <Link href={`/${userId}/${post.id}`}>
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    <i>Created By: {post.userEmail}</i><br />
                    <i>Created At: {post.dateMS}</i>
                </div>
            </Link>
        </EditPost>
    )
}