import styles from '@/app/components/css/comment.module.css'

export default function CommentComponent({ comment }: {
    comment: CommentObj
}) {
    return (
        <>
            <div className={styles['commentBody']}>
                <p style={{ whiteSpace: 'pre-wrap' }}>
                    {comment.body}
                </p>
            </div>
            <div className={styles['commentMeta']}>
                <i>{comment.userEmail}</i>
                <i>{new Date(comment.dateMS).toLocaleDateString()}</i>
            </div>
        </>
    )
}