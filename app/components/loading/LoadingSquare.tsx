import styles from '@/app/components/css/loadingSquare.module.css'

export default function LoadingSquare({ children, style }: {
    children?: React.ReactNode,
    style?: {
        [key: string]: any
    }
}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            placeItems: 'center',
            alignContent: 'center',
            width: '100vw',
            height: '100vh',
            gap: '1rem'
        }}>
            {children}
            <div className={styles['lds-grid']} style={{
                ...style,
                scale: style?.scale ?? 1.5
            }}>
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
        </div>
    )
}