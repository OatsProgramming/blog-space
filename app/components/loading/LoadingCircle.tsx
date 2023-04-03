import styles from '@/app/components/css/loadingCircle.module.css'

export default function LoadingCircle({ style }: {
    style: {
        [key: string]: any
    }
}) {
    return (
        <div className={styles['lds-ring']} style={style}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}