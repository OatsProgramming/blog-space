'use client'

import { mutatePost } from "@/app/lib/CRUD-ops/postCRUD"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

export default function EditPost({ children, currentUser, post }: {
    children: React.ReactNode,
    currentUser: boolean,
    post: PostObj,
}) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [newContent, setNewContent] = useState<PostObj>({} as PostObj)
    const [isPending, startTransition] = useTransition()
    const [isFetching, setIsFetching] = useState(false)

    // For inline styling
    const isMutating = isPending || isFetching

    async function handleEdit() {
        if (isEditing && newContent.title && newContent.body) {
            setIsFetching(true)
            await mutatePost(
                "PATCH",
                {
                    ...newContent,
                    id: post.id
                }
            )
            setIsFetching(false)
            setNewContent({} as PostObj)
            startTransition(() => {
                router.refresh()
            })
        }
        setIsEditing(!isEditing)
    }

    async function handleDelete() {
        setIsFetching(true)
        await mutatePost(
            "DELETE",
            {
                id: post.id
            }
        )
        setIsFetching(false)
        startTransition(() => {
            router.refresh()
        })
    }


    return (
        <>
            {isEditing ? (
                <>
                    <input placeholder={post.title} onChange={(e) => setNewContent({ ...newContent, title: e.target.value.trim() })} />
                    <textarea onChange={(e) => setNewContent({ ...newContent, body: e.target.value.trim() })}
                        cols={90} rows={30} minLength={10} maxLength={1000} placeholder={post.body}
                    />
                </>
            ) : (
                <>
                    {children}
                </>
            )}
            {currentUser && (
                <span style={{opacity: isMutating ? 0 : 1}}>
                    <button onClick={handleEdit}>
                        {isEditing ? (
                            // Save Icon
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                            </svg>
                        ) : (
                            // Edit Icon
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
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
                // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
                //   <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                // </svg>
            )}
        </>
    )
}