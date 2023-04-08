'use client'

import PostComponent from "@/app/components/posting/Post"
import CommentsSection from "@/app/components/commenting/CommentSection"
import useSWR from 'swr'
import { notFound } from "next/navigation"
import EditPost from "@/app/components/posting/EditPost"
import LoadingSquare from "@/app/components/loading/LoadingSquare"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function PostPage({ params: { userId, postId } }: Params) {
   
    const { data: post, isLoading, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?postId=${postId}`, fetcher)

    if (isLoading) return <LoadingSquare />
    else if (error) notFound()

    return (
        <div style={{
            padding: '1rem'
        }}>
            <div style={{
                marginBottom: '3rem'
            }}>
                <EditPost post={post} currentUser={post.userId === userId} mutate={mutate}>
                    <PostComponent userId={userId} post={post} inComment/>
                </EditPost>
            </div>
            <div>
                <CommentsSection postId={postId} />
            </div>
        </div>
    )
}
