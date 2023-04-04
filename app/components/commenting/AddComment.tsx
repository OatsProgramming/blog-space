import { auth } from "@/app/config/firebase-config"
import { mutateComment } from "@/app/lib/CRUD-ops/commentCRUD"
import { useRef, useState } from "react"
import { KeyedMutator } from "swr/_internal"
import { AnimatePresence, LazyMotion, m } from "framer-motion"
import { containerVariant, transition, itemVariant } from "@/app/lib/animation/addComment"
import styles from '../../components/css/addComment.module.css'

export default function AddComment({ postId, mutate, comments }: { 
    postId: string,
    mutate: KeyedMutator<CommentObj[]>,
    comments: CommentObj[],
 }) {
    const [newComment, setNewComment] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const textRef = useRef<HTMLTextAreaElement>(null)

    const loadFeatures = () => import('../../lib/animation/domAnimation').then((mod) => mod.default)

    async function handleClick() {
        if (newComment.trim() === '') return
        await mutateComment(
            postId,
            'POST',
            {
                body: newComment,
                postId: postId,
                userEmail: auth.currentUser?.email,
                dateMS: Date.now()
            }
        )
        mutate([...comments, {
            // Temp id ( shouldnt affect anything )
            id: crypto.randomUUID(),
            body: newComment,
            postId: postId,
            userEmail: auth.currentUser?.email!,
            dateMS: Date.now()
        }])
        setNewComment('')
        setIsCreating(false)
        textRef.current!.value = ''
    }

    function handleCancel() {
        setIsCreating(false)
        textRef.current!.value = ''
    }

    return (
        <div className={styles['mainContainer']}>
            <div className='textFieldContainer'>
                <textarea 
                    className='textFieldItem'
                    rows={5} maxLength={400} ref={textRef}
                    autoCapitalize="sentences" autoComplete="on"
                    placeholder='Join the discussion...'
                    spellCheck 
                    onChange={(e) => setNewComment(e.target.value.trim())}
                    onFocus={() => setIsCreating(true)}
                    onBlur={() => setIsCreating(false)}
                />
            </div>
            <div className={styles['flexContainer']}>
                <LazyMotion features={loadFeatures} strict>
                    <AnimatePresence>
                        {isCreating && (
                            <m.div
                                variants={containerVariant}
                                transition={transition}
                                initial='initial'
                                animate='enter'
                                exit='exit'
                                style={{
                                    position: 'absolute'
                                }}
                            >
                                <m.button onClick={handleClick} variants={itemVariant}>
                                    {/* Send icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
                                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                    </svg>
                                </m.button>
                                <m.button onClick={handleCancel} variants={itemVariant}>
                                    {/* Delete icon ( used as cancel ) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                    </svg>
                                </m.button>
                            </m.div>
                        )}
                    </AnimatePresence>
                </LazyMotion>
            </div>
        </div>
    )
}