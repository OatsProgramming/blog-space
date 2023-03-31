'use client'

import { mutatePost } from "@/app/lib/CRUD-ops/postCRUD"
import { useRouter } from "next/navigation"
import React, { useState, useTransition } from "react"
import { auth } from "../../config/firebase-config"
import { TbSend } from 'react-icons/tb'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { MdOutlineCancel } from 'react-icons/md'

export default function AddPost() {
    const router = useRouter()
    const [isCreating, setIsCreating] = useState(false)
    const [content, setContent] = useState<PostObj>({} as PostObj)
    const [isPending, startTransition] = useTransition()

    // Submitting post obj
    async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (!content.title || !content.body) return
        mutatePost(
            "POST",
            {
                ...content,
                userId: auth.currentUser?.uid,
                userEmail: auth.currentUser?.email,
                dateMS: Date.now()
            }
        )
        startTransition(() => {
            router.refresh()
        })
        setContent({} as PostObj)
        setIsCreating(false)
    }

    return (
        <div>
            {isCreating && (
                <div className={`modal ${isCreating ? '' : 'hidden'}`}>
                    <div className="card">
                        <form>
                            <input onChange={(e) => setContent({ ...content, title: e.target.value.trim() })} />
                            <textarea onChange={(e) => setContent({ ...content, body: e.target.value.trim() })}
                                cols={90} rows={30} minLength={10} maxLength={1000}
                            />
                            <div className="flexContainer">
                                <button onClick={handleClick}>
                                    <TbSend className="icon" />
                                </button>
                                <button onClick={() => setIsCreating(false)}>
                                    <MdOutlineCancel className="icon" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <button onClick={() => setIsCreating(true)}>
                <IoMdAddCircleOutline className="icon" />
            </button>
        </div>
    )
}