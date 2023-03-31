'use client'

import { auth } from "@/app/config/firebase-config"
import { mutateComment } from "@/app/lib/CRUD-ops/commentCRUD"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

export default function AddComment({ postId }: { postId: string }) {
    const router = useRouter()
    const [newComment, setNewComment] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [isPending, startTransition] = useTransition();

    function handleClick() {
        if (newComment.trim() === '') return
        mutateComment(
            postId,
            'POST',
            {
                body: newComment,
                postId: postId,
                userEmail: auth.currentUser?.email,
                dateMS: Date.now()
            }
        )
        setNewComment('')
        setIsCreating(false)
        startTransition(() => {
            router.refresh()
        })
    }

    return (
        <div>
            {isCreating && (
                <>
                    <textarea name="comment"
                        cols={50} rows={5} maxLength={400}
                        autoCapitalize="sentences" autoComplete="on"
                        placeholder={newComment !== '' ? newComment : 'Hello there!'}
                        spellCheck autoFocus
                        onChange={(e) => setNewComment(e.target.value.trim())}
                    />
                    <button onClick={handleClick}>
                        {/* Send icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg>
                    </button>
                </>
            )}
            <button onClick={() => setIsCreating(!isCreating)}>
                {isCreating ? (
                    // Delete icon ( used as cancel )
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                    </svg>
                ) : (
                    // Add Icon
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='white'>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                )}
            </button>
        </div>
    )
}