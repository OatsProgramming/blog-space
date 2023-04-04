import { auth } from "@/app/config/firebase-config"
import { mutateComment } from "@/app/lib/CRUD-ops/commentCRUD"
import { comments } from "@/toyData/commentData"
import { useState } from "react"
import { KeyedMutator } from "swr/_internal"
import styles from '@/app/components/css/comment.module.css'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'
import { TbSend } from 'react-icons/tb'

export default function EditComment({ children, comment, mutate }: {
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
            {/* Change back to auth.currentUser?.uid later */}
            {comment.userEmail == auth.currentUser?.email && (
                <div className={styles['clickableContainer']}>
                    <div
                        className={styles['clickable']}
                        onClick={handleEdit}>
                        {isEditing ? <TbSend className="icon" /> : <FaRegEdit className="icon"/>}
                    </div>
                    <div
                        className={styles['clickable']}
                        onClick={() => {
                            isEditing ? setIsEditing(false) : handleDelete()
                    }}>
                        {isEditing ? <MdOutlineCancel className="icon" /> : <FaTrashAlt className="icon"/>}
                    </div>
                </div>
            )}
        </div>
    )
}