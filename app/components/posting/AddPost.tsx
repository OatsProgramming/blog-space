'use client'

import { mutatePost } from "@/app/lib/CRUD-ops/postCRUD"
import { useRouter } from "next/navigation"
import React, { useRef, useState, useTransition } from "react"
import { auth } from "../../config/firebase-config"
import { TbSend } from 'react-icons/tb'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { MdOutlineCancel } from 'react-icons/md'
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
                                    <MdOutlineCancel className="icon" />
                                </button>
                                <button onClick={handleSend}>
                                    <TbSend className="icon" />
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