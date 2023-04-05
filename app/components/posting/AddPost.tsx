'use client'

import { mutatePost } from "@/app/lib/CRUD-ops/postCRUD"
import { useRouter } from "next/navigation"
import React, { useRef, useState, useTransition } from "react"
import { auth } from "../../config/firebase-config"
import styles from '@/app/components/css/addPost.module.css'

export default function AddPost() {
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)
    const textRef = useRef<HTMLTextAreaElement>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [content, setContent] = useState<PostObj>({} as PostObj)
    const [, startTransition] = useTransition()

    // Submitting post obj
    async function handleSend(e: React.MouseEvent<HTMLButtonElement>) {
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

    function handleCancel() {
        setIsCreating(false)
        inputRef.current!.value = ''
        textRef.current!.value = ''
    }

    return (
        <div>
            {isCreating && (
                <div className={`${styles['modal']} ${!isCreating && styles['hidden']}`}>
                    <div className={styles['card']} >
                        <form className={styles['form']}>
                            <div className="textFieldContainer">
                                <input 
                                    className='textFieldItem'
                                    ref={inputRef} 
                                    onChange={(e) => setContent({ ...content, title: e.target.value.trim() })}
                                    autoFocus maxLength={150}
                                />
                            </div>
                            <div className="textFieldContainer">
                                <textarea className='textFieldItem' ref={textRef} onChange={(e) => setContent({ ...content, body: e.target.value})}
                                    minLength={10} maxLength={100_000} 
                                    style={{ height: '50vh' }}
                                />
                            </div>
                            <div className={styles['btnContainer']}>
                                <button onClick={handleCancel}>
                                    {/* <MdOutlineCancel className="icon" /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </button>
                                <button onClick={handleSend}>
                                    {/* <TbSend className="icon" /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <button onClick={() => setIsCreating(true)}>
                {/* <IoMdAddCircleOutline className="icon" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </button>
        </div>
    )
}