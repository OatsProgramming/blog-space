import styles from '@app/components/css/loadingSquare.module.css'

export default function LoadingSquare({ style }: {
    style?: {
        [key: string]: any
    }
}) {
    return (
        <div className={styles['lds-grid']} style={style}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}