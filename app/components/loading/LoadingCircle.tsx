import styles from '@/app/components/css/loadingCircle.module.css'

export default function LoadingCircle({ children, style }: {
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
            gap: '1rem'
        }}>
            {children}
            <div className={styles['lds-ring']} style={style}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}