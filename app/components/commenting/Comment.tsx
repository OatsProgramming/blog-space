'use client'

import { auth } from "@/app/config/firebase-config"
import { mutateComment } from "@/app/lib/CRUD-ops/commentCRUD"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CommentComponent({ comment, userId } : {
    comment: CommentObj,
    userId: string
}) {

    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [newContent, setNewContent] = useState('')

    async function handleEdit() {
        if (isEditing && newContent !== '') {
            mutateComment(
                comment.postId,
                'PATCH',
                {
                    body: newContent,
                    dateMS: Date.now(),
                    id: comment.id,
                }
            )
            setNewContent('')
        } 
        setIsEditing(!isEditing)
        router.refresh()
    }

    async function handleDelete() {
        mutateComment(
            comment.postId,
            'DELETE',
            {
                id: comment.id
            }
        )
        router.refresh()
    }

    return (
        <div>
            {isEditing ? (
                <>
                    <textarea
                        placeholder={comment.body}
                        onChange={(e) => setNewContent(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <p>{comment.body}</p>
                    <i>{comment.userEmail}</i>
                    <i>{comment.dateMS}</i>
                </>
            )}
            {userId == auth.currentUser?.uid && (
                <span>
                    <button onClick={() => {
                        
                        handleEdit()
                    }}>
                        {isEditing ? (
                            // Save Icon
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                            </svg>
                        ) : (
                            // Edit Icon
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>    
                        )}
                    </button>
                    <button onClick={handleDelete}>
                        {/* Delete icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                        </svg>
                    </button>
                </span>
            )}
        </div>
    )
}