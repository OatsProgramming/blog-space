import { auth } from "@/app/config/firebase-config"
import { mutateComment } from "@/app/lib/CRUD-ops/commentCRUD"
import { useState } from "react"
import { KeyedMutator } from "swr/_internal"
import styles from '@/app/components/css/comment.module.css'

export default function EditComment({ children, comment, mutate, comments }: {
    children: React.ReactNode,
    comment: CommentObj,
    mutate: KeyedMutator<CommentObj[]>,
    comments: CommentObj[],
}) {

    const [isEditing, setIsEditing] = useState(false)
    const [newContent, setNewContent] = useState('')

    async function handleEdit() {
        if (isEditing && newContent !== '') {
            await mutateComment(
                comment.postId,
                'PATCH',
                {
                    body: newContent,
                    dateMS: Date.now(),
                    id: comment.id,
                }
            )
            setNewContent('')
            mutate([...comments, {
                ...comment,
                body: newContent,
                dateMS: Date.now(),
            }])
        }
        setIsEditing(!isEditing)
    }

    async function handleDelete() {
        await mutateComment(
            comment.postId,
            'DELETE',
            {
                id: comment.id
            }
        )
        mutate(comments.filter(c => c.id !== comment.id))
    }

    return (
        <div className={styles['comment']}>
            {isEditing ? (
                <div className="textFieldContainer" style={{
                    marginBottom: '-10px'
                }}>
                    <textarea
                        className="textFieldItem"
                        autoFocus
                        placeholder={comment.body}
                        onChange={(e) => setNewContent(e.target.value)}
                    />
                </div>
            ) : (
                <>
                    {children}
                </>
            )}
            {comment.userEmail == auth.currentUser?.email && (
                <div className={styles['clickableContainer']}>
                    <div
                        className={styles['clickable']}
                        onClick={handleEdit}>
                        {isEditing ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                            </svg>
                        ): (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        )}
                    </div>
                    <div
                        className={styles['clickable']}
                        onClick={() => {
                            isEditing ? setIsEditing(false) : handleDelete()
                    }}>
                        {isEditing ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        ): (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                </svg>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}