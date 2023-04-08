import Link from "next/link";
import RefreshPage from "../RefreshPage";
import styles from '@/app/components/css/notSignedIn.module.css'

export default function NotSignedIn() {
    return (
        <div className={styles['container']}>
            <h1>
                Trying to sign in?
            </h1>
            <div>
                <p>
                    Please log in <Link href={'/'}><i>here</i></Link>
                </p>
                <p>
                    Or try refreshing the page
                </p>
            </div>
            <div style={{
                width: '30rem'
            }}>
                <RefreshPage />
            </div>
        </div>
    )
}